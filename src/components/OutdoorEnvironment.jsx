import { useRef } from 'react'
import * as THREE from 'three'
import Reindeer from './Reindeer'

export default function OutdoorEnvironment() {
  // 눈 덮인 땅
  const SnowGround = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#e8f4f8"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )

  // 나무 (소나무)
  const PineTree = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
      {/* 나무 줄기 */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>

      {/* 나뭇잎 레이어들 */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color="#1a4d2e" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1, 1.8, 8]} />
        <meshStandardMaterial color="#1a4d2e" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color="#1a4d2e" />
      </mesh>

      {/* 눈 쌓인 효과 */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[1.25, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.05, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )

  // 오두막 외벽
  const CabinExterior = () => (
    <group>
      {/* 앞벽 (문이 있는 쪽) - 문 공간 제외 */}
      {/* 왼쪽 벽 부분 */}
      <mesh position={[-4.75, 4, 7.5]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 8, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      {/* 오른쪽 벽 부분 */}
      <mesh position={[4.75, 4, 7.5]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 8, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      {/* 문 위쪽 벽 */}
      <mesh position={[0, 6.5, 7.5]} receiveShadow castShadow>
        <boxGeometry args={[3.5, 3, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* 문 */}
      <mesh position={[0, 3, 7.7]} receiveShadow castShadow>
        <boxGeometry args={[2.2, 6.2, 0.3]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.7} />
      </mesh>

      {/* 문 손잡이 */}
      <mesh position={[0.8, 3, 7.85]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 문 패널 장식 */}
      <mesh position={[0, 4, 7.86]}>
        <boxGeometry args={[1.6, 2, 0.05]} />
        <meshStandardMaterial color="#6b5644" />
      </mesh>
      <mesh position={[0, 2, 7.86]}>
        <boxGeometry args={[1.6, 2, 0.05]} />
        <meshStandardMaterial color="#6b5644" />
      </mesh>

      {/* 왼쪽 벽 외부 */}
      <mesh position={[-7.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[15, 8, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* 오른쪽 벽 외부 */}
      <mesh position={[7.5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[15, 8, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* 지붕 */}
      <mesh position={[0, 8.5, 0]} rotation={[0, 0, Math.PI / 8]} receiveShadow>
        <boxGeometry args={[17, 0.5, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 8.5, 0]} rotation={[0, 0, -Math.PI / 8]} receiveShadow>
        <boxGeometry args={[17, 0.5, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* 지붕 위 눈 */}
      <mesh position={[0, 9.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[17.2, 0.3, 16.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 9.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[17.2, 0.3, 16.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* 굴뚝 */}
      <group position={[4, 9, -3]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 2.5, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <boxGeometry args={[1.2, 0.3, 1.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* 굴뚝 연기는 나중에 파티클로 추가 가능 */}
      </group>
    </group>
  )

  // 바위들
  const Rock = ({ position, scale = 1 }) => (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#696969" roughness={1} />
    </mesh>
  )

  // 눈더미
  const SnowPile = ({ position, scale = 1 }) => (
    <mesh position={position} scale={[scale, scale * 0.5, scale]} receiveShadow>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#f0f8ff" roughness={0.9} />
    </mesh>
  )

  // 울타리
  const Fence = ({ position, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
      {/* 울타리 기둥들 */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#4a2511" />
        </mesh>
      ))}
      {/* 가로대 */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#4a2511" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[4.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#4a2511" />
      </mesh>
    </group>
  )

  return (
    <group>
      {/* 눈 덮인 땅 */}
      <SnowGround />

      {/* 오두막 외벽 */}
      <CabinExterior />

      {/* 소나무 숲 */}
      <PineTree position={[-15, 0, -10]} scale={1.2} />
      <PineTree position={[-20, 0, -5]} scale={1} />
      <PineTree position={[-18, 0, 8]} scale={1.3} />
      <PineTree position={[-25, 0, 0]} scale={0.9} />
      <PineTree position={[-22, 0, 15]} scale={1.1} />

      <PineTree position={[15, 0, -12]} scale={1.1} />
      <PineTree position={[20, 0, -3]} scale={1.3} />
      <PineTree position={[18, 0, 10]} scale={1} />
      <PineTree position={[25, 0, 5]} scale={1.2} />
      <PineTree position={[22, 0, -18]} scale={0.9} />

      <PineTree position={[0, 0, -20]} scale={1.4} />
      <PineTree position={[-8, 0, -22]} scale={1.1} />
      <PineTree position={[8, 0, -25]} scale={1.2} />
      <PineTree position={[5, 0, 20]} scale={1} />
      <PineTree position={[-5, 0, 22]} scale={1.3} />

      {/* 바위들 */}
      <Rock position={[-10, 0.2, 12]} scale={1.5} />
      <Rock position={[12, 0.15, -8]} scale={1.2} />
      <Rock position={[-8, 0.1, -15]} scale={1} />
      <Rock position={[15, 0.2, 15]} scale={1.3} />

      {/* 눈더미 */}
      <SnowPile position={[-12, 0, 5]} scale={2} />
      <SnowPile position={[10, 0, 8]} scale={1.5} />
      <SnowPile position={[8, 0, -12]} scale={1.8} />
      <SnowPile position={[-6, 0, -8]} scale={1.3} />

      {/* 울타리 */}
      <Fence position={[-10, 0, 10]} rotation={[0, Math.PI / 4, 0]} />
      <Fence position={[10, 0, -10]} rotation={[0, -Math.PI / 3, 0]} />

      {/* 순록들 */}
      <Reindeer position={[12, 0, 5]} rotation={[0, -Math.PI / 4, 0]} scale={1} />
      <Reindeer position={[-14, 0, 3]} rotation={[0, Math.PI / 3, 0]} scale={0.9} />
      <Reindeer position={[8, 0, -8]} rotation={[0, Math.PI / 6, 0]} scale={1.1} />
      <Reindeer position={[-10, 0, -12]} rotation={[0, -Math.PI / 2, 0]} scale={0.95} />
    </group>
  )
}
