import { useRef, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'

export default function Person({ position = [0, 0, 0], isInside }) {
  const [showBubble, setShowBubble] = useState(false)
  const bubbleTimerRef = useRef(null)

  // 방에 들어올 때 자동으로 말풍선 표시
  useEffect(() => {
    if (isInside) {
      setShowBubble(true)

      // 3초 후 말풍선 숨기기
      bubbleTimerRef.current = setTimeout(() => {
        setShowBubble(false)
      }, 3000)
    }

    return () => {
      if (bubbleTimerRef.current) {
        clearTimeout(bubbleTimerRef.current)
      }
    }
  }, [isInside])

  const handleClick = (e) => {
    e.stopPropagation()
    setShowBubble(true)

    // 기존 타이머 클리어
    if (bubbleTimerRef.current) {
      clearTimeout(bubbleTimerRef.current)
    }

    // 3초 후 말풍선 숨기기
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false)
    }, 3000)
  }

  // 몸통
  const Body = () => (
    <group>
      {/* 하체 (털옷) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 1, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      {/* 상체 (털옷) */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.8, 8]} />
        <meshStandardMaterial color="#a0522d" roughness={0.9} />
      </mesh>
      {/* 털 장식 (하얀 털) */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.28, 0.05, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <torusGeometry args={[0.32, 0.05, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  )

  // 머리 (동물의 숲 스타일 - 더 크고 둥글게)
  const Head = () => (
    <mesh position={[0, 1.9, 0]}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color="#ffdbac" roughness={0.6} />
    </mesh>
  )

  // 눈 (동물의 숲 스타일 - 크고 반짝이는)
  const Eye = ({ x }) => (
    <group position={[x, 1.95, 0.22]}>
      {/* 눈 흰자 */}
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 눈동자 */}
      <mesh position={[0.008, -0.005, 0.03]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>
      {/* 큰 하이라이트 */}
      <mesh position={[0.015, 0.015, 0.055]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* 작은 하이라이트 */}
      <mesh position={[-0.012, -0.012, 0.05]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )

  // 코
  const Nose = () => (
    <mesh position={[0, 1.88, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.025, 0.06, 8]} />
      <meshStandardMaterial color="#ffb8a0" />
    </mesh>
  )

  // 큰 웃는 입 (입꼬리가 올라간 형태 - 동물의 숲 스타일)
  const Smile = () => (
    <group position={[0, 1.78, 0.19]}>
      {/* 왼쪽 입꼬리 (위로 올라감) */}
      <mesh position={[-0.05, 0.03, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.012, 0.04, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* 오른쪽 입꼬리 (위로 올라감) */}
      <mesh position={[0.05, 0.03, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.012, 0.04, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* 입 중앙 하단 */}
      <mesh position={[0, -0.01, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.008, 0.06, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )

  // 눈썹 (기쁜 표정)
  const Eyebrow = ({ x }) => (
    <mesh position={[x, 2.01, 0.17]} rotation={[0, 0, x < 0 ? Math.PI / 8 : -Math.PI / 8]}>
      <boxGeometry args={[0.06, 0.01, 0.01]} />
      <meshStandardMaterial color="#654321" />
    </mesh>
  )

  // 모자 (털 모자)
  const Hat = () => (
    <group position={[0, 2.1, 0]}>
      {/* 모자 몸체 */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 16]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      {/* 모자 테두리 (털) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.23, 0.05, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* 모자 꼭대기 (털) */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  )

  // 팔
  const Arm = ({ side }) => {
    const xPos = side === 'left' ? -0.35 : 0.35
    const rotation = side === 'left' ? [0, 0, -Math.PI / 6] : [0, 0, Math.PI / 6]

    return (
      <group position={[xPos, 1.2, 0]} rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.06, 0.6, 8]} />
          <meshStandardMaterial color="#a0522d" />
        </mesh>
        {/* 손 */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
      </group>
    )
  }

  // 다리
  const Leg = ({ side }) => {
    const xPos = side === 'left' ? -0.12 : 0.12

    return (
      <mesh position={[xPos, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    )
  }

  return (
    <group position={position}>
      {/* 클릭 가능한 투명 영역 */}
      <mesh
        position={[0, 1.2, 0]}
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
        <cylinderGeometry args={[0.5, 0.5, 2.5, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 다리 */}
      <Leg side="left" />
      <Leg side="right" />

      {/* 몸통 */}
      <Body />

      {/* 팔 */}
      <Arm side="left" />
      <Arm side="right" />

      {/* 머리 */}
      <Head />

      {/* 얼굴 */}
      <Eyebrow x={-0.08} />
      <Eyebrow x={0.08} />
      <Eye x={-0.08} />
      <Eye x={0.08} />
      <Nose />
      <Smile />

      {/* 모자 */}
      <Hat />

      {/* 말풍선 - 머리 위 */}
      {showBubble && (
        <Html position={[0, 2.8, 0]} center distanceFactor={8}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '3px solid #4a90e2',
              borderRadius: '20px',
              padding: '16px 28px',
              color: '#333',
              fontSize: '22px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              minWidth: '220px',
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ marginBottom: '4px' }}>하이아크!</div>
            <div>메리크리스마스!</div>
            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid rgba(255, 255, 255, 0.95)',
              }}
            />
          </div>
        </Html>
      )}
    </group>
  )
}
