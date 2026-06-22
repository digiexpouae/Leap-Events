"use client"
import { useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { geometry } from 'maath'

function VideoMesh({ rotateRef, ref3 }) {
  const meshRef = useRef()
  const [texture, setTexture] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const materialRef = useRef()
  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

  const posterTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load('/assets/placeholder.JPG')
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
    const onLoaded = () => {
      const tex = new THREE.VideoTexture(videoEl)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      tex.needsUpdate = true
      setTexture(tex)
      // Play only when visible
      if (isVisible) {
        videoEl.play().catch(() => {})
      }
    }

    videoEl.onloadedmetadata = onLoaded
    videoEl.load()

    return () => {
      videoEl.pause()
      videoEl.src = ''
      videoEl.load()
      if (texture) texture.dispose()
    }
  }, [videoEl])

  // Play/pause based on visibility
  useEffect(() => {
    if (isVisible && texture) {
      videoEl.play().catch(() => {})
    } else if (!isVisible) {
      videoEl.pause()
    }
  }, [isVisible, texture])

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

    // Continue checking until opacity is 1
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
  }, [texture])

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

  return (
    <mesh ref={meshRef}>
      <roundedPlaneGeometry args={[16, 9, 0.5]} />
      <meshBasicMaterial 
        ref={materialRef}
        map={texture || posterTexture} 
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

export default function VideoScene({ fovRef, canvasWrapperRef, rotateRef ,ref3}) {
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