import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function ChristmasTree({ position = [0, 0, 0], onClick }) {
  const ornamentRefs = useRef([])
  const [showBubble, setShowBubble] = useState(false)

  useFrame((state) => {
    // 오너먼트 반짝이기
    ornamentRefs.current.forEach((ornament, i) => {
      if (ornament) {
        ornament.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
      }
    })
  })

  // 나무 몸통
  const Trunk = () => (
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.15, 0.2, 0.6, 8]} />
      <meshStandardMaterial color="#4a2511" />
    </mesh>
  )

  // 나무 잎 레이어
  const TreeLayer = ({ y, radius, height }) => (
    <mesh position={[0, y, 0]}>
      <coneGeometry args={[radius, height, 8]} />
      <meshStandardMaterial color="#0d5c0d" />
    </mesh>
  )

  // 별 장식
  const Star = () => {
    const starShape = new THREE.Shape()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const radius = i % 2 === 0 ? 0.15 : 0.07
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) starShape.moveTo(x, y)
      else starShape.lineTo(x, y)
    }
    starShape.closePath()

    return (
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, 0]}>
        <extrudeGeometry args={[starShape, { depth: 0.1, bevelEnabled: false }]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} />
      </mesh>
    )
  }

  // 오너먼트
  const ornaments = [
    { pos: [0.3, 1.2, 0.3], color: '#ff0000' },
    { pos: [-0.3, 1.4, 0.2], color: '#0000ff' },
    { pos: [0.4, 1.6, -0.2], color: '#ffd700' },
    { pos: [-0.35, 1.8, -0.1], color: '#ff69b4' },
    { pos: [0.25, 2.0, 0.25], color: '#00ffff' },
    { pos: [-0.2, 2.2, 0.15], color: '#ff4500' },
    { pos: [0.15, 1.0, -0.3], color: '#9370db' },
    { pos: [-0.25, 0.8, 0.2], color: '#00ff00' },
  ]

  const handleClick = (e) => {
    e.stopPropagation()
    setShowBubble(true)
    if (onClick) onClick()

    // 3초 후 말풍선 숨기기
    setTimeout(() => {
      setShowBubble(false)
    }, 3000)
  }

  return (
    <group position={position}>
      {/* 클릭 가능한 투명 영역 */}
      <mesh
        position={[0, 1.5, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'default'
        }}
      >
        <cylinderGeometry args={[0.8, 0.8, 3, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Trunk />
      <TreeLayer y={0.8} radius={0.7} height={1.0} />
      <TreeLayer y={1.4} radius={0.55} height={0.9} />
      <TreeLayer y={1.9} radius={0.4} height={0.8} />
      <TreeLayer y={2.3} radius={0.25} height={0.6} />
      <Star />

      {/* 오너먼트들 */}
      {ornaments.map((ornament, i) => (
        <mesh
          key={i}
          position={ornament.pos}
          ref={(el) => (ornamentRefs.current[i] = el)}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={ornament.color}
            emissive={ornament.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* 빛나는 조명 효과 */}
      <pointLight position={[0, 2.8, 0]} intensity={0.5} color="#ffd700" distance={2} />
      <pointLight position={[0, 1.5, 0]} intensity={0.3} color="#ffffff" distance={2} />

      {/* 말풍선 - 화면 하단 고정 */}
      {showBubble && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '3px solid #0d5c0d',
              borderRadius: '20px',
              padding: '20px 32px',
              color: '#0d5c0d',
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              minWidth: '300px',
              zIndex: 100,
              animation: 'slideUp 0.5s ease',
            }}
          >
            <div style={{ marginBottom: '8px', fontSize: '24px' }}>🌲</div>
            <div>저는 세그먼트 트리입니다</div>
            <div style={{ marginTop: '4px' }}>하하하하 메리크리스마스~</div>
          </div>
        </Html>
      )}
    </group>
  )
}
