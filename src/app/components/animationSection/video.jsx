"use client"
import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, extend,useThree } from '@react-three/fiber'

import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { geometry } from 'maath' // Auto-installed with Drei


function VideoMesh({rotateRef}) {
  const meshRef = useRef()
  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

  // 1. Create the video element with a URL string, not an import
  const videoEl = useMemo(() => {
    const v = document.createElement('video')
    v.src = '/assets/leap_showreel.mp4'   // path relative to /public
    v.crossOrigin = 'anonymous'
    v.loop = true
    v.muted = true

    v.style.borderRadius = '24px'
    v.playsInline = true
    v.play()
    return v
  }, [])

  // 2. Create VideoTexture from the DOM element, not the file
  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(videoEl)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [videoEl])

  // 3. Animate inside useFrame (never outside Canvas)
  useFrame((state) => {
    if (!meshRef.current ) return;
    // state.pointer coordinates range from -1 to +1
    const { x, y } = state.pointer

    if (!rotateRef?.current) {
    meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.05
    return
  }


    // Smoothly interpolate the camera position toward the mouse position
    // Multiply by a small decimal (e.g., 0.5) to keep the rotation "slight"
    const targetRotationX = -y * 0.1
    const targetRotationY = x * 0.1

    // Smoothly interpolate (lerp) the object's rotation
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y)
    // Ensure the camera continues looking at the center of the scene
    state.camera.lookAt(0, 0, 0)
  })

  
  return (
    // ... inside your component:
    <mesh ref={meshRef}>
      <roundedPlaneGeometry   args={[16,9, 0.5]}  />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>

  )
}
function CameraController({ fovRef }) {
  const { camera } = useThree()

  useFrame(() => {
    if (!fovRef?.current) return
    camera.fov += (fovRef.current - camera.fov) * 0.05  // smooth lerp
    camera.updateProjectionMatrix()   
               // required after fov change
  })

  return null
}

export default function VideoScene({ fovRef, canvasWrapperRef,rotateRef  }) {
  return (
   <div
  ref={canvasWrapperRef}
className="scale-x-95 scale-40 md:scale-[0.6]"
  style={{
    width: '100%',                  // final size, set once
    height: '100%',
        // starts visually small
    transformOrigin: '50% 50%',     // grow from center
    willChange: 'transform',
  }}// smaller than parent
>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ width: '100%', height: '100%' }}  // fill the wrapper
   
   >
        <CameraController fovRef={fovRef} />
        <VideoMesh rotateRef={rotateRef} />
      </Canvas>
    </div>
  )
}