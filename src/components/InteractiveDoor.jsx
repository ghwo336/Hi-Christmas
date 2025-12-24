import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function InteractiveDoor({ position = [0, 3, 7.7] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const doorRef = useRef()
  const targetRotation = useRef(0)
  const currentRotation = useRef(0)

  // 클릭 핸들러
  const handleClick = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
    targetRotation.current = !isOpen ? -Math.PI / 2 : 0
  }

  // 부드러운 애니메이션
  useFrame(() => {
    if (!doorRef.current) return

    // 부드럽게 회전
    const diff = targetRotation.current - currentRotation.current
    currentRotation.current += diff * 0.1

    doorRef.current.rotation.y = currentRotation.current
  })

  return (
    <group position={position}>
      {/* 문 프레임 */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[2.2, 6.2, 0.3]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>

      {/* 문 (회전하는 부분) */}
      <group
        ref={doorRef}
        position={[-1, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={handleClick}
      >
        <mesh position={[1, 0, 0]}>
          <boxGeometry args={[2, 6, 0.2]} />
          <meshStandardMaterial
            color={hovered ? '#5a3a21' : '#4a2511'}
            emissive={hovered ? '#2a1a11' : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>

        {/* 문 손잡이 */}
        <mesh position={[1.7, 0, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
            emissive={hovered ? '#ffd700' : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>

        {/* 문 장식 패널 */}
        <mesh position={[1, 1.5, 0.12]}>
          <boxGeometry args={[0.8, 1.5, 0.05]} />
          <meshStandardMaterial color="#3d2817" />
        </mesh>
        <mesh position={[1, -1.5, 0.12]}>
          <boxGeometry args={[0.8, 1.5, 0.05]} />
          <meshStandardMaterial color="#3d2817" />
        </mesh>
      </group>

      {/* 문 앞 포인트 라이트 (문이 열렸을 때 밖이 보이도록) */}
      {isOpen && (
        <pointLight
          position={[0, 0, 1]}
          intensity={0.5}
          color="#e0f0ff"
          distance={5}
        />
      )}
    </group>
  )
}
