"use client"
import { useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { geometry } from 'maath'

function VideoMesh({ rotateRef, ref3 }) {
  const meshRef = useRef()
  const [texture, setTexture] = useState(null)
  const [videoReady, setVideoReady] = useState(false) // 👈 explicit readiness flag
  const [isVisible, setIsVisible] = useState(false)
  const materialRef = useRef()
  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

  const posterTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(
      '/assets/placeholder-compressed.webp',
      () => console.log('%c[Poster] Image loaded successfully', 'color: orange'),
      undefined,
      (err) => console.error('%c[Poster] FAILED to load:', 'color: red', err)
    )
    tex.colorSpace = THREE.SRGBColorSpace
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    return tex
  }, [])

  const videoEl = useMemo(() => {
    const v = document.createElement('video')
    v.src = '/assets/leap_showreel_optimized.mp4'
    v.crossOrigin = 'anonymous'
    v.loop = true
    v.muted = true
    v.playsInline = true
    v.preload = 'metadata'
    v.setAttribute('playsinline', 'true')
    v.setAttribute('webkit-playsinline', 'true')
    return v
  }, [])

  // Load video on mount (don't play yet)
  useEffect(() => {
    console.log('%c[Poster] Showing placeholder now', 'color: orange')

    const idleCallback = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          console.log('%c[Idle] Browser is idle — starting video.load() now', 'color: cyan')
          videoEl.load()
        })
      : setTimeout(() => {
          console.log('%c[Timeout Fallback] Starting video.load() now', 'color: cyan')
          videoEl.load()
        }, 2000)

    const onLoaded = () => {
      console.log('%c[Video] Metadata loaded — creating texture, swapping poster → video', 'color: lightgreen')

      const tex = new THREE.VideoTexture(videoEl)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      tex.needsUpdate = true
      setTexture(tex)
      setVideoReady(true) // 👈 mark video as genuinely ready

      if (isVisible) {
        videoEl.play()
          .then(() => console.log('%c[Video] Playing now', 'color: lightgreen; font-weight: bold'))
          .catch((err) => console.log('[Video] Play failed/blocked:', err))
      }
    }

    videoEl.onloadedmetadata = onLoaded

    return () => {
      console.log('%c[Cleanup] Component unmounting, cancelling pending load + disposing video', 'color: red')
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleCallback)
      } else {
        clearTimeout(idleCallback)
      }
      videoEl.pause()
      videoEl.src = ''
      videoEl.load()
      if (texture) texture.dispose()
    }
  }, [videoEl])

  // Play/pause based on visibility
  useEffect(() => {
    if (isVisible && videoReady) {
      videoEl.play().catch(() => {})
    } else if (!isVisible) {
      videoEl.pause()
    }
  }, [isVisible, videoReady])

  // IntersectionObserver with safety check
  useEffect(() => {
    if (!ref3.current) return

    const el = ref3.current
    const video = el.querySelector('video')
    let played = false

    const checkOpacity = () => {
      const opacity = parseFloat(window.getComputedStyle(el).opacity)

      if (opacity === 1 && !played) {
        played = true
        setIsVisible(true)
        if (video) video.play()
      }

      if (opacity < 1) {
        requestAnimationFrame(checkOpacity)
      }
    }

    checkOpacity()

    return () => {
      // Cleanup if component unmounts
    }
  }, [ref3])

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true
    }
  }, [texture, posterTexture])

  useFrame((state) => {
    if (!meshRef.current) return
    const { x, y } = state.pointer
    const isMobile = window.innerWidth < 768
    const targetRotationX = -y * (isMobile ? 0.02 : 0.03)
    const targetRotationY = x * (isMobile ? 0.02 : 0.03)

    if (!rotateRef?.current) {
      meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.05
      return
    }

    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05
  })

  // 👇 Explicit, deterministic choice — no race condition
  const activeMap = videoReady && texture ? texture : posterTexture

  return (
    <mesh ref={meshRef}>
      <roundedPlaneGeometry args={[16, 9, 0.5]} />
      <meshBasicMaterial
        ref={materialRef}
        map={activeMap}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}

function CameraController({ fovRef }) {
  const { camera } = useThree()
  useFrame(() => {
    if (!fovRef?.current) return
    camera.fov += (fovRef.current - camera.fov) * 0.05
    camera.updateProjectionMatrix()
  })
  return null
}

export default function VideoScene({ fovRef, canvasWrapperRef, rotateRef, ref3 }) {
  return (
    <div
      ref={canvasWrapperRef}
      className="scale-x-95 scale-40 md:scale-[0.6]"
      style={{
        width: '100%',
        height: '100%',
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CameraController fovRef={fovRef} />
        <VideoMesh rotateRef={rotateRef} ref3={ref3} canvasWrapperRef={canvasWrapperRef} />
      </Canvas>
    </div>
  )
}