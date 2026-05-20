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
  autoRotate = true,        // NEW — enable continuous rotation
  autoRotateSpeed = 0.15,   // NEW — degrees per frame
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
  const rafRef = useRef(null);           // NEW — requestAnimationFrame handle

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const getBgPos = (imageIndex, currentRot, scale) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

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

  // ── Sync background parallax + facing opacity on rotation change ──────────
  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          // Background parallax
          imgElement.style.backgroundPosition = getBgPos(i, latestRotation, currentScale);

          // Each card's world-space Y rotation = ring rotation + card's own offset
          const worldAngle = ((latestRotation - i * angle) % 360 + 360) % 360;

          // worldAngle: 0deg = fully facing viewer, 90deg = edge, 180deg = back
          // Clamp to front hemisphere only — anything >= 90deg is invisible
          const isFront = worldAngle < 90 || worldAngle > 270;
          const opacity = isFront ? 1 : 0;
          imgElement.style.opacity = String(opacity);
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle]);

  // ── Responsive scale ────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      // Scale card width to ~45vw on desktop, ~80vw on mobile
      const targetW = vw <= mobileBreakpoint ? vw * 0.8 : vw * 0.45;
      setCurrentScale(targetW / width);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, width]);

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
    currentRotationY.current = next;   // keep ref in sync so auto-rotate resumes correctly
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) ringRef.current.style.cursor = "grab";

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    // If autoRotate is on, let the loop take over — no inertia needed.
    // If autoRotate is off, apply inertia as before.
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

  return (
    <div
      ref={containerRef}
      className={`w-full h-[55%]  select-none relative ${containerClassName}`}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div className={` w-[400px] md:w-[${width}px] `}
        style={{
          perspective: `${perspective}px`,
        
          // 16:9 height derived from width
          // height: `${Math.round(width * (9 / 16))}px`,
              width: `${width}px`,

              aspectRatio: "16 / 9",

          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
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
                  style={{
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backfaceVisibility: "hidden",
                    rotateY: index * -angle,
                    z: -imageDistance * currentScale,
                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                    backgroundPosition: getBgPos(index, currentRotationY.current, currentScale),
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
                      Array.from(ringRef.current.children).forEach((imgEl) => {
                        imgEl.style.opacity = "1";
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