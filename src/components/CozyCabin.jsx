import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CozyCabin() {
  const fireRef = useRef()

  useFrame((state) => {
    // 벽난로 불꽃 애니메이션
    if (fireRef.current) {
      fireRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  // 바닥
  const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="#5c4033" roughness={0.9} />
    </mesh>
  )

  // 벽 (양면)
  const Wall = ({ position, rotation, width = 15, height = 8 }) => (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#8b6f47" roughness={0.95} side={THREE.DoubleSide} />
    </mesh>
  )

  // 천장
  const Ceiling = () => (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="#6b5644" roughness={0.9} />
    </mesh>
  )

  // 창문
  const Window = ({ position }) => (
    <group position={position}>
      {/* 창틀 */}
      <mesh>
        <boxGeometry args={[1.5, 1.8, 0.15]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      {/* 유리 */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.3, 1.6]} />
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* 창문 십자가 */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.3, 0.05, 0.03]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.05, 1.6, 0.03]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
    </group>
  )

  // 벽난로
  const Fireplace = () => (
    <group position={[0, 1.5, -7.3]}>
      {/* 벽난로 본체 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 0.8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* 벽난로 개구부 */}
      <mesh position={[0, -0.5, 0.3]}>
        <boxGeometry args={[2, 1.5, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 불꽃 */}
      <mesh ref={fireRef} position={[0, -0.5, 0.4]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial
          color="#ff4500"
          emissive="#ff4500"
          emissiveIntensity={1.5}
        />
      </mesh>
      {/* 벽난로 빛 */}
      <pointLight position={[0, -0.5, 0.5]} intensity={1.5} color="#ff6600" distance={8} />
    </group>
  )

  // 러그 (양탄자)
  const Rug = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <circleGeometry args={[3, 32]} />
      <meshStandardMaterial color="#8b0000" roughness={1} />
    </mesh>
  )

  // 서까래 (천장 장식)
  const Beam = ({ position, rotation = [0, 0, 0] }) => (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.3, 0.3, 15]} />
      <meshStandardMaterial color="#4a2511" roughness={0.9} />
    </mesh>
  )

  // 작은 테이블
  const Table = ({ position }) => (
    <group position={position}>
      {/* 테이블 상판 */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* 테이블 다리 */}
      {[
        [-0.6, 0.3, -0.4],
        [0.6, 0.3, -0.4],
        [-0.6, 0.3, 0.4],
        [0.6, 0.3, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
          <meshStandardMaterial color="#4a2511" />
        </mesh>
      ))}
    </group>
  )

  // 램프
  const Lamp = ({ position }) => (
    <group position={position}>
      {/* 램프 받침 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      {/* 램프갓 */}
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.2, 0.3, 8]} />
        <meshStandardMaterial
          color="#ffe4b5"
          emissive="#ffe4b5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* 램프 빛 */}
      <pointLight position={[0, 0.2, 0]} intensity={0.4} color="#ffe4b5" distance={3} />
    </group>
  )

  return (
    <group>
      {/* 방 구조 */}
      <Floor />
      <Wall position={[0, 4, -7.5]} rotation={[0, 0, 0]} />
      <Wall position={[-7.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[7.5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* 앞벽 (문이 있는 쪽) - 내부에서 보이는 벽 */}
      {/* 왼쪽 부분 */}
      <mesh position={[-4.75, 4, 7.5]} receiveShadow>
        <planeGeometry args={[5.5, 8]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.95} side={THREE.BackSide} />
      </mesh>
      {/* 오른쪽 부분 */}
      <mesh position={[4.75, 4, 7.5]} receiveShadow>
        <planeGeometry args={[5.5, 8]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.95} side={THREE.BackSide} />
      </mesh>
      {/* 문 위쪽 */}
      <mesh position={[0, 6.5, 7.5]} receiveShadow>
        <planeGeometry args={[3.5, 3]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.95} side={THREE.BackSide} />
      </mesh>

      {/* 문 공간 차단 (밖에서 안이 안 보이게) - 전체 벽 크기로 확장 */}
      <mesh position={[0, 4, 7.5]} receiveShadow>
        <planeGeometry args={[15, 8]} />
        <meshStandardMaterial color="#000000" roughness={1} side={THREE.BackSide} opacity={1} />
      </mesh>

      <Ceiling />

      {/* 창문들 */}
      <Window position={[-5, 4, -7.4]} />
      <Window position={[5, 4, -7.4]} />

      {/* 벽난로 */}
      <Fireplace />

      {/* 바닥 장식 */}
      <Rug />

      {/* 천장 서까래 */}
      <Beam position={[-3, 7.8, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Beam position={[0, 7.8, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Beam position={[3, 7.8, 0]} rotation={[0, 0, Math.PI / 2]} />

      {/* 가구 */}
      <Table position={[-4, 0, 2]} />
      <Lamp position={[-4, 0.65, 2]} />
    </group>
  )
}
