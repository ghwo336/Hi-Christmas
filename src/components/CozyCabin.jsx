import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

export default function CozyCabin() {
  const fireRef = useRef();

  useFrame((state) => {
    // 벽난로 불꽃 애니메이션
    if (fireRef.current) {
      fireRef.current.material.emissiveIntensity =
        1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  // 바닥
  const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="#5c4033" roughness={0.9} />
    </mesh>
  );

  // 천장
  const Ceiling = () => (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial color="#6b5644" roughness={0.9} />
    </mesh>
  );

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

      {/* 장작 - 아래층 (가로 배치) */}
      <mesh position={[-0.3, -1.1, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, -1.1, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#2d1810" roughness={0.9} />
      </mesh>

      {/* 장작 - 중간층 (세로 배치) */}
      <mesh position={[0, -1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.9, 8]} />
        <meshStandardMaterial color="#4a2511" roughness={0.9} />
      </mesh>
      <mesh
        position={[-0.2, -0.95, 0.45]}
        rotation={[Math.PI / 2, 0, Math.PI / 6]}
      >
        <cylinderGeometry args={[0.07, 0.07, 0.8, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>

      {/* 장작 - 위층 (타는 장작, 발광 효과) */}
      <mesh
        position={[0.15, -0.85, 0.5]}
        rotation={[Math.PI / 2, 0, -Math.PI / 8]}
      >
        <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
        <meshStandardMaterial
          color="#1a0a00"
          emissive="#ff4500"
          emissiveIntensity={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* 불꽃 - 중앙 큰 불꽃 */}
      <mesh ref={fireRef} position={[0, -0.5, 0.5]}>
        <coneGeometry args={[0.35, 0.9, 4]} />
        <meshStandardMaterial
          color="#ff4500"
          emissive="#ff4500"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 불꽃 - 작은 불꽃들 */}
      <mesh position={[-0.15, -0.7, 0.5]}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={1.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0.2, -0.65, 0.48]}>
        <coneGeometry args={[0.18, 0.45, 4]} />
        <meshStandardMaterial
          color="#ff5500"
          emissive="#ff5500"
          emissiveIntensity={1.4}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* 벽난로 빛 - 더 밝게 */}
      <pointLight
        position={[0, -0.5, 0.6]}
        intensity={2}
        color="#ff6600"
        distance={10}
      />
      <pointLight
        position={[0, -0.8, 0.5]}
        intensity={1.2}
        color="#ff4500"
        distance={6}
      />
    </group>
  );

  // 러그 (양탄자)
  const Rug = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <circleGeometry args={[3, 32]} />
      <meshStandardMaterial color="#8b0000" roughness={1} />
    </mesh>
  );

  // 서까래 (천장 장식)
  const Beam = ({position, rotation = [0, 0, 0]}) => (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.3, 0.3, 15]} />
      <meshStandardMaterial color="#4a2511" roughness={0.9} />
    </mesh>
  );

  // 작은 테이블
  const Table = ({position}) => (
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
  );

  // 램프
  const Lamp = ({position}) => (
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
      <pointLight
        position={[0, 0.2, 0]}
        intensity={0.4}
        color="#ffe4b5"
        distance={3}
      />
    </group>
  );

  return (
    <group>
      {/* 실내 - 내부 벽들 (안에서만 보임, BackSide) */}
      <group>
        {/* 바닥 */}
        <Floor />

        {/* 천장 */}
        <Ceiling />

        {/* 뒷벽 (벽난로 벽) */}
        <mesh position={[0, 4, -7.5]} receiveShadow>
          <planeGeometry args={[15, 8]} />
          <meshStandardMaterial
            color="#8b6f47"
            roughness={0.95}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 왼쪽 벽 */}
        <mesh position={[-7.5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[15, 8]} />
          <meshStandardMaterial
            color="#8b6f47"
            roughness={0.95}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 오른쪽 벽 */}
        <mesh position={[7.5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[15, 8]} />
          <meshStandardMaterial
            color="#8b6f47"
            roughness={0.95}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 앞벽 (문 벽) - 완전히 막힘 */}
        <mesh position={[0, 4, 7.5]} receiveShadow>
          <planeGeometry args={[15, 8]} />
          <meshStandardMaterial
            color="#8b6f47"
            roughness={0.95}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* 외부 - 외벽들 (밖에서만 보임, 불투명) */}
      <group>
        {/* 뒷벽 외부 - 두꺼운 박스로 */}
        <mesh position={[0, 4, -7.55]} receiveShadow castShadow>
          <boxGeometry args={[15, 8, 0.3]} />
          <meshStandardMaterial
            color="#6b5644"
            roughness={0.95}
          />
        </mesh>

        {/* 왼쪽 벽 외부 - 두꺼운 박스로 */}
        <mesh position={[-7.55, 4, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.3, 8, 15]} />
          <meshStandardMaterial
            color="#6b5644"
            roughness={0.95}
          />
        </mesh>

        {/* 오른쪽 벽 외부 - 두꺼운 박스로 */}
        <mesh position={[7.55, 4, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.3, 8, 15]} />
          <meshStandardMaterial
            color="#6b5644"
            roughness={0.95}
          />
        </mesh>

        {/* 앞벽 외부 - 두꺼운 박스로 */}
        <mesh position={[0, 4, 7.55]} receiveShadow castShadow>
          <boxGeometry args={[15, 8, 0.3]} />
          <meshStandardMaterial
            color="#6b5644"
            roughness={0.95}
          />
        </mesh>

        {/* 문 (외부 장식) */}
        <mesh position={[0, 3.5, 7.72]} castShadow>
          <boxGeometry args={[2, 4, 0.05]} />
          <meshStandardMaterial color="#4a2511" roughness={0.9} />
        </mesh>

        {/* 문 손잡이 */}
        <mesh position={[0.6, 3.5, 7.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

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
  );
}
