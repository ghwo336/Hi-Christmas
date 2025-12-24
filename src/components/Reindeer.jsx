import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Reindeer({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const tailRef = useRef()

  useFrame((state) => {
    // 꼬리 흔들기
    if (tailRef.current) {
      tailRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  // 몸통
  const Body = () => (
    <mesh position={[0, 1, 0]}>
      <boxGeometry args={[0.8, 0.6, 1.2]} />
      <meshStandardMaterial color="#8b5a3c" />
    </mesh>
  )

  // 목
  const Neck = () => (
    <mesh position={[0, 1.5, -0.4]} rotation={[0.5, 0, 0]}>
      <cylinderGeometry args={[0.15, 0.2, 0.7, 8]} />
      <meshStandardMaterial color="#8b5a3c" />
    </mesh>
  )

  // 머리
  const Head = () => (
    <group position={[0, 2, -0.6]}>
      {/* 얼굴 */}
      <mesh>
        <boxGeometry args={[0.35, 0.4, 0.5]} />
        <meshStandardMaterial color="#a06b47" />
      </mesh>

      {/* 코 (빨간 코) */}
      <mesh position={[0, -0.05, -0.3]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 눈 */}
      <mesh position={[-0.12, 0.08, -0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 0.08, -0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 귀 */}
      <mesh position={[-0.2, 0.25, -0.05]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#8b5a3c" />
      </mesh>
      <mesh position={[0.2, 0.25, -0.05]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#8b5a3c" />
      </mesh>
    </group>
  )

  // 뿔
  const Antler = ({ side }) => {
    const xPos = side === 'left' ? -0.15 : 0.15
    return (
      <group position={[xPos, 2.3, -0.6]}>
        {/* 메인 가지 */}
        <mesh rotation={[0, 0, side === 'left' ? -0.3 : 0.3]}>
          <cylinderGeometry args={[0.02, 0.04, 0.5, 6]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
        {/* 가지 1 */}
        <mesh position={[side === 'left' ? -0.08 : 0.08, 0.15, 0]} rotation={[0, 0, side === 'left' ? -0.8 : 0.8]}>
          <cylinderGeometry args={[0.015, 0.025, 0.25, 6]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
        {/* 가지 2 */}
        <mesh position={[side === 'left' ? -0.12 : 0.12, 0.25, 0]} rotation={[0, 0, side === 'left' ? -1.2 : 1.2]}>
          <cylinderGeometry args={[0.01, 0.02, 0.2, 6]} />
          <meshStandardMaterial color="#d4a574" />
        </mesh>
      </group>
    )
  }

  // 다리
  const Leg = ({ position }) => (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#8b5a3c" />
      </mesh>
      {/* 발굽 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.15]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
    </group>
  )

  // 꼬리
  const Tail = () => (
    <mesh ref={tailRef} position={[0, 1.1, 0.65]} rotation={[-0.5, 0, 0]}>
      <coneGeometry args={[0.08, 0.2, 8]} />
      <meshStandardMaterial color="#6b4423" />
    </mesh>
  )

  // 목에 방울 장식
  const BellCollar = () => (
    <group position={[0, 1.3, -0.4]}>
      <mesh>
        <torusGeometry args={[0.22, 0.03, 8, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      {/* 방울 */}
      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Body />
      <Neck />
      <Head />
      <Antler side="left" />
      <Antler side="right" />

      {/* 네 다리 */}
      <Leg position={[-0.25, 0, -0.35]} />
      <Leg position={[0.25, 0, -0.35]} />
      <Leg position={[-0.25, 0, 0.35]} />
      <Leg position={[0.25, 0, 0.35]} />

      <Tail />
      <BellCollar />

      {/* 빨간 코 빛 효과 */}
      <pointLight position={[0, 2, -0.9]} intensity={0.3} color="#ff0000" distance={2} />
    </group>
  )
}
