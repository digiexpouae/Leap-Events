"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut } from "framer-motion";
import { animate } from "framer-motion";

export function ThreeDImageRing({
  images = [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2938&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744626753-1fa7604d459a?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071131384-001b85755536?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop",
  ],
  width = 700,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName = "",
  ringClassName = "",
  imageClassName = "",
  backgroundColor,
  draggable = true,
  autoRotate = true,
  autoRotateSpeed = 0.15,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const rafRef = useRef(null);

  // Store scale in a ref so 3D children always read the latest value
  // without needing a re-render
  const scaleRef = useRef(1);
  const [currentScale, setCurrentScale] = useState(1);
const [currentPerspective, setCurrentPerspective] = useState(perspective);

  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  // ── Auto-rotation loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (!autoRotate) return;

    const tick = () => {
      if (!isDragging.current) {
        currentRotationY.current += autoRotateSpeed;
        rotationY.set(currentRotationY.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate, autoRotateSpeed]);

  // ── Sync opacity on rotation change ──────────────────────────────────────
  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          const worldAngle = ((latestRotation - i * angle) % 360 + 360) % 360;
          const isFront = worldAngle < 90 || worldAngle > 270;
          imgElement.style.opacity = isFront ? "1" : "0";
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, angle]);

  // ── Responsive scale ────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const targetW = vw <= mobileBreakpoint ? vw * 0.85 : vw * 0.6;
      const scale = targetW / width;
      scaleRef.current = scale;
      setCurrentScale(scale);
      setCurrentPerspective(vw <= mobileBreakpoint ? 500 : 1200); // ✅


      // Immediately update 3D transforms on all children
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgEl) => {
          imgEl.style.transform = `rotateY(${parseFloat(imgEl.dataset.angle || 0)}deg) translateZ(${imageDistance * scale}px)`;
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, width, imageDistance]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  // ── Drag handlers ───────────────────────────────────────────────────────
  const handleDragStart = (event) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) ringRef.current.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event) => {
    if (!draggable || !isDragging.current) return;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.5;
    const next = currentRotationY.current + velocity.current;
    rotationY.set(next);
    currentRotationY.current = next;
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) ringRef.current.style.cursor = "grab";

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    if (!autoRotate) {
      const initial = rotationY.get();
      const velocityBoost = velocity.current * inertiaVelocityMultiplier;
      const target = initial + velocityBoost;

      animate(initial, target, {
        type: "inertia",
        velocity: velocityBoost,
        power: inertiaPower,
        timeConstant: inertiaTimeConstant,
        restDelta: 0.5,
        modifyTarget: (t) => Math.round(t / angle) * angle,
        onUpdate: (latest) => {
          rotationY.set(latest);
          currentRotationY.current = latest;
        },
      });
    }

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Scaled dimensions — perspective container uses these directly
  const scaledWidth = width * currentScale;

  return (
    // ✅ Outer container: NO scale() transform. Just a full-width flex centering wrapper.
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center select-none relative ${containerClassName}`}
      style={{
        backgroundColor,
        height: `${Math.round(scaledWidth * (9 / 16) * 0.7)}px`,

      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      {/* ✅ Perspective div sized to the actual scaled width — no double scaling */}
      <div
        style={{
          perspective: `${currentPerspective}px`,
          width: `${scaledWidth}px`,
          aspectRatio: "16 / 9",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <motion.div
          ref={ringRef}
          className={`w-full h-full absolute ${ringClassName}`}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages &&
              images.map((imageUrl, index) => (
                <motion.div
                  key={index}
                  className={`w-full h-full absolute ${imageClassName}`}
                  // ✅ z and transformOrigin use currentScale from state (triggers re-render on resize)
                  style={{
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"center center",
                    backfaceVisibility: "hidden",
                    rotateY: index * -angle,
                    z: -(imageDistance * currentScale),
                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={imageVariants}
                  transition={{
                    delay: index * staggerDelay,
                    duration: animationDuration,
                    ease: easeOut,
                  }}
                  whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                  onHoverStart={() => {
                    if (isDragging.current) return;
                    if (ringRef.current) {
                      Array.from(ringRef.current.children).forEach((imgEl, i) => {
                        if (i !== index) imgEl.style.opacity = `${hoverOpacity}`;
                      });
                    }
                  }}
                  onHoverEnd={() => {
                    if (isDragging.current) return;
                    if (ringRef.current) {
                      const rot = currentRotationY.current;
                      Array.from(ringRef.current.children).forEach((imgEl, i) => {
                        const worldAngle = ((rot - i * angle) % 360 + 360) % 360;
                        const isFront = worldAngle < 90 || worldAngle > 270;
                        imgEl.style.opacity = isFront ? "1" : "0";
                      });
                    }
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ThreeDImageRing;