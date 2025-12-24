import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SnowParticles({ count = 2000 }) {
  const pointsRef = useRef()

  // 눈송이 위치와 속도 생성
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // 랜덤한 초기 위치 (오두막 주변 넓은 영역)
      positions[i3] = (Math.random() - 0.5) * 80 // x
      positions[i3 + 1] = Math.random() * 40 + 5 // y (높이)
      positions[i3 + 2] = (Math.random() - 0.5) * 80 // z

      // 눈송이마다 다른 낙하 속도
      velocities[i3] = (Math.random() - 0.5) * 0.02 // x drift
      velocities[i3 + 1] = -Math.random() * 0.05 - 0.02 // y fall speed
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02 // z drift
    }

    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // 위치 업데이트
      positions[i3] += particles.velocities[i3] // x
      positions[i3 + 1] += particles.velocities[i3 + 1] // y
      positions[i3 + 2] += particles.velocities[i3 + 2] // z

      // 땅에 닿으면 다시 위로
      if (positions[i3 + 1] < 0) {
        positions[i3 + 1] = 40 + Math.random() * 10
        positions[i3] = (Math.random() - 0.5) * 80
        positions[i3 + 2] = (Math.random() - 0.5) * 80
      }

      // 영역을 벗어나면 다시 중앙으로
      if (Math.abs(positions[i3]) > 40) {
        positions[i3] = (Math.random() - 0.5) * 80
      }
      if (Math.abs(positions[i3 + 2]) > 40) {
        positions[i3 + 2] = (Math.random() - 0.5) * 80
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
