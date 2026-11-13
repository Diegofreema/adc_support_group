import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { strengthHex } from '../utils/strength-colour'
import type { MapUnit } from './coords'

const SIZE = 0.0045
const BASE_HEIGHT = 0.003
const MAX_HEIGHT = 0.12
const NONE = new THREE.Color(0x3a4d3e)
const DIMMED = new THREE.Color(0x26302a)

interface Props {
  units: MapUnit[]
  /** Units outside this LGA are dimmed; null shows all. */
  highlight: (unit: MapUnit) => boolean
  onHover: (unit: MapUnit | null) => void
}

/** Every polling unit of a state as one instanced column: height and colour = members. One draw call. */
export function UnitColumns({ units, highlight, onHover }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(SIZE, SIZE, 1)
    g.translate(0, 0, 0.5) // grow up from the ground
    return g
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  const most = useMemo(() => Math.max(1, ...units.map((u) => u.members)), [units])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    const color = new THREE.Color()
    units.forEach((u, i) => {
      // Square root so a few big units don't flatten everything else.
      const share = Math.sqrt(u.members / most)
      m.makeScale(1, 1, BASE_HEIGHT + MAX_HEIGHT * share).setPosition(u.x, u.y, 0.002)
      mesh.setMatrixAt(i, m)
      const tint = u.members === 0 ? NONE : color.setHex(strengthHex(share))
      mesh.setColorAt(i, highlight(u) ? tint : DIMMED)
    })
    mesh.count = units.length
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [units, highlight, most])

  return (
    <instancedMesh
      key={units.length}
      ref={ref}
      args={[geometry, undefined, Math.max(units.length, 1)]}
      onPointerMove={(e) => {
        e.stopPropagation()
        onHover(e.instanceId !== undefined ? units[e.instanceId] ?? null : null)
      }}
      onPointerOut={() => onHover(null)}
    >
      <meshStandardMaterial roughness={0.6} metalness={0.05} />
    </instancedMesh>
  )
}
