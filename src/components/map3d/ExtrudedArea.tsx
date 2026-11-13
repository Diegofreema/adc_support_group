// Copied from Rise Up (src/components/shared/map3d/ExtrudedArea.tsx); keep the two in step.
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const EDGE_DEFAULT = 0x3a4d3e
const EDGE_ACTIVE = 0xd4af37

interface Props {
  shapes: THREE.Shape[]
  depth: number
  color: number
  active?: boolean
  opacity?: number
  onHover?: () => void
  onUnhover?: () => void
  onClick?: () => void
}

/** One extruded map area (a state) with its outline. */
export function ExtrudedArea({ shapes, depth, color, active, opacity = 1, onHover, onUnhover, onClick }: Props) {
  const { geometry, edges } = useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: false, curveSegments: 3 })
    return { geometry, edges: new THREE.EdgesGeometry(geometry, 10) }
  }, [shapes, depth])

  useEffect(() => () => { geometry.dispose(); edges.dispose() }, [geometry, edges])

  return (
    <group>
      <mesh
        geometry={geometry}
        onPointerOver={onHover && ((e) => { e.stopPropagation(); onHover() })}
        onPointerOut={onUnhover && (() => onUnhover())}
        onClick={onClick && ((e) => { e.stopPropagation(); onClick() })}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.5 : 0.18}
          roughness={0.7}
          metalness={0.08}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={active ? EDGE_ACTIVE : EDGE_DEFAULT} transparent opacity={active ? 0.95 : 0.55} />
      </lineSegments>
    </group>
  )
}
