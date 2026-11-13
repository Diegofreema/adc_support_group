// Copied from Rise Up (src/components/shared/map3d/MapCanvas.tsx); keep the two in step.
import { useEffect, useState, type ReactNode } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export interface MapFrame {
  cx: number
  cy: number
  width: number
  height: number
}

const FIT_PADDING = 1.2

/** Points the camera at `frame` so it fills the canvas, slightly tilted. */
function CameraFit({ frame }: { frame: MapFrame }) {
  const { camera, size, invalidate, controls } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera) || size.height === 0) return
    const aspect = size.width / size.height
    const halfFovTan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
    const distance = Math.max((frame.height / 2) / halfFovTan, (frame.width / 2) / (halfFovTan * aspect)) * FIT_PADDING
    camera.position.set(frame.cx, frame.cy - distance * 0.3, distance)
    camera.lookAt(frame.cx, frame.cy, 0)
    camera.updateProjectionMatrix()
    const orbit = controls as unknown as { target?: THREE.Vector3; update?: () => void } | null
    orbit?.target?.set(frame.cx, frame.cy, 0)
    orbit?.update?.()
    invalidate()
  }, [camera, controls, frame.cx, frame.cy, frame.height, frame.width, invalidate, size.height, size.width])

  return null
}

interface Props {
  frame: MapFrame
  children: ReactNode
  /** Distance limits relative to the frame; tighter in the state view. */
  minDistance?: number
  maxDistance?: number
}

/** Canvas, lights and orbit controls shared by the 3-D Nigeria maps. */
export function MapCanvas({ frame, children, minDistance = 0.3, maxDistance = 28 }: Props) {
  const [tabHidden, setTabHidden] = useState(false)

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <Canvas
      frameloop={tabHidden ? 'never' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, -2, 9], fov: 46, near: 0.01, far: 200 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.75} color={0xd8e6dc} />
      <directionalLight position={[3, 8, 6]} intensity={1.6} />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color={0x44b860} />
      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        zoomSpeed={0.6}
        minDistance={minDistance}
        maxDistance={maxDistance}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.9}
      />
      <CameraFit frame={frame} />
      {children}
    </Canvas>
  )
}
