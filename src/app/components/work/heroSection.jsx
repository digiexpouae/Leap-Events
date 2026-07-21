"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut } from "framer-motion";
import { animate } from "framer-motion";

// Custom play cursor
const PLAY_CURSOR = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='130' height='130'%3E%3Cpath d='M130 0H0V130H130V0Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Cpath d='M64.8389 14.334C92.8214 14.3342 115.505 37.0186 115.505 65.001C115.505 92.9829 92.8213 115.667 64.8389 115.667C36.8567 115.667 14.172 92.983 14.1719 65.001C14.1719 37.0185 36.8565 14.334 64.8389 14.334Z' stroke='white' stroke-width='7'/%3E%3Cpath d='M81.0869 55.4141L65.3786 46.3684C61.4786 44.0934 56.7661 44.0934 52.8659 46.3684C48.9659 48.6434 46.6367 52.6517 46.6367 57.2016V75.3474C46.6367 79.8433 48.9659 83.9058 52.8659 86.1808C54.8161 87.3183 56.9828 87.8599 59.0953 87.8599C61.2619 87.8599 63.3744 87.3183 65.3244 86.1808L81.0328 77.1349C84.9328 74.8599 87.2619 70.8516 87.2619 66.3016C87.3703 61.7516 85.0411 57.6891 81.0869 55.4141Z' fill='%23FFFCFC'/%3E%3C/g%3E%3C/svg%3E") 20 20, pointer`;

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
  const [activeVideo, setActiveVideo] = useState(null);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : null;
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
                  className={`group w-full h-full absolute ${imageClassName}`}
                  // ✅ z and transformOrigin use currentScale from state (triggers re-render on resize)
                  style={{
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(${imageUrl.image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"center center",
                    backfaceVisibility: "hidden",
                    rotateY: index * -angle,
                    z: -(imageDistance * currentScale),
                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                    cursor: imageUrl.video ? PLAY_CURSOR : "pointer",
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
                  onClick={() => {
                    if (isDragging.current) return;
                    if (imageUrl.video) setActiveVideo(imageUrl.video);
                  }}
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
                >
                  {imageUrl.video && (
                    <span
                      className="md:hidden pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span
                        className="h-[20%] w-[14%] drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundImage: `url("/assets/play-icon.svg")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </span>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo)}?autoplay=1&mute=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: "block", maxHeight: "80vh" }}
              />

              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-20 h-9 w-9 flex items-center justify-center cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThreeDImageRing;