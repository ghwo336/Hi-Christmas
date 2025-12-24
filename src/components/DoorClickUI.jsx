import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function DoorClickUI({ position, onClick, visible = true }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current || !visible) return

    // 부드럽게 위아래로 움직이는 애니메이션
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={position}>
      {/* 3D 클릭 아이콘 배경 */}
      <mesh onClick={onClick}>
        <circleGeometry args={[0.4, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML 오버레이 - 이모티콘 */}
      <Html
        center
        distanceFactor={8}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            cursor: 'pointer',
            textShadow: '0 0 10px rgba(0,0,0,0.5)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          👆
        </div>
      </Html>

      {/* 클릭 텍스트 */}
      <Html
        position={[0, -0.6, 0]}
        center
        distanceFactor={8}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '8px 16px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}
        >
          클릭하여 입장
        </div>
      </Html>

      {/* 포인트 라이트 - 시선을 끄는 효과 */}
      <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#ffffff" distance={3} />

      {/* CSS 애니메이션을 위한 스타일 태그 */}
      <Html>
        <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
          }
        `}</style>
      </Html>
    </group>
  )
}
