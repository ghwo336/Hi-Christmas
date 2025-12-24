import { useRef, useEffect } from 'react'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import ChristmasTree from './ChristmasTree'
import Snowman from './Snowman'
import Person from './Person'
import CozyCabin from './CozyCabin'
import OutdoorEnvironment from './OutdoorEnvironment'
import SnowParticles from './SnowParticles'
import DoorClickUI from './DoorClickUI'

export default function Scene({ isInside, setIsInside }) {
  const cameraRef = useRef()
  const controlsRef = useRef()
  const targetCameraPos = useRef([0, 8, 20])
  const targetControlsTarget = useRef([0, 4, 0])
  const previousCameraState = useRef(null)

  // 실내/외에 따른 카메라 제약 설정
  useEffect(() => {
    if (!controlsRef.current) return

    if (isInside) {
      // 실내에서는 움직임 제한
      controlsRef.current.enablePan = false
      controlsRef.current.minDistance = 3
      controlsRef.current.maxDistance = 10
      controlsRef.current.minAzimuthAngle = -Math.PI / 3
      controlsRef.current.maxAzimuthAngle = Math.PI / 3
      controlsRef.current.minPolarAngle = Math.PI / 4
      controlsRef.current.maxPolarAngle = Math.PI / 2
    } else {
      // 야외에서는 자유로운 움직임
      controlsRef.current.enablePan = true
      controlsRef.current.minDistance = 5
      controlsRef.current.maxDistance = 100
      controlsRef.current.minAzimuthAngle = -Infinity
      controlsRef.current.maxAzimuthAngle = Infinity
      controlsRef.current.minPolarAngle = 0
      controlsRef.current.maxPolarAngle = Math.PI / 2.1
    }
    controlsRef.current.update()
  }, [isInside])

  // 카메라 부드럽게 이동
  useFrame(() => {
    if (!cameraRef.current || !controlsRef.current) return

    // 현재 위치에서 목표 위치로 부드럽게 이동
    cameraRef.current.position.x += (targetCameraPos.current[0] - cameraRef.current.position.x) * 0.05
    cameraRef.current.position.y += (targetCameraPos.current[1] - cameraRef.current.position.y) * 0.05
    cameraRef.current.position.z += (targetCameraPos.current[2] - cameraRef.current.position.z) * 0.05

    // 컨트롤 타겟도 부드럽게 이동
    controlsRef.current.target.x += (targetControlsTarget.current[0] - controlsRef.current.target.x) * 0.05
    controlsRef.current.target.y += (targetControlsTarget.current[1] - controlsRef.current.target.y) * 0.05
    controlsRef.current.target.z += (targetControlsTarget.current[2] - controlsRef.current.target.z) * 0.05

    controlsRef.current.update()
  })

  const handleDoorClick = () => {
    // 안으로 들어가기
    targetCameraPos.current = [0, 5, 5]
    targetControlsTarget.current = [0, 2, -2]
    setIsInside(true)
  }

  const handleTreeClick = () => {
    if (!cameraRef.current || !controlsRef.current) return

    // 현재 카메라 상태 저장
    if (!previousCameraState.current) {
      previousCameraState.current = {
        position: [...cameraRef.current.position.toArray()],
        target: [...controlsRef.current.target.toArray()],
      }

      // 트리로 줌인 (실내 기준, 트리 위치: [-2, 0, -2])
      targetCameraPos.current = [-2, 2, 0]
      targetControlsTarget.current = [-2, 1.5, -2]

      // 3초 후 원래 위치로 복귀
      setTimeout(() => {
        if (previousCameraState.current) {
          targetCameraPos.current = previousCameraState.current.position
          targetControlsTarget.current = previousCameraState.current.target
          previousCameraState.current = null
        }
      }, 3000)
    }
  }

  const handleSnowmanClick = () => {
    if (!cameraRef.current || !controlsRef.current) return

    // 현재 카메라 상태 저장
    if (!previousCameraState.current) {
      previousCameraState.current = {
        position: [...cameraRef.current.position.toArray()],
        target: [...controlsRef.current.target.toArray()],
      }

      // 눈사람으로 줌인 (실내 기준, 눈사람 위치: [2.5, 0, -1])
      targetCameraPos.current = [2.5, 2, 1]
      targetControlsTarget.current = [2.5, 1.2, -1]

      // 3초 후 원래 위치로 복귀
      setTimeout(() => {
        if (previousCameraState.current) {
          targetCameraPos.current = previousCameraState.current.position
          targetControlsTarget.current = previousCameraState.current.target
          previousCameraState.current = null
        }
      }, 3000)
    }
  }

  // 밖으로 나가기 효과
  useEffect(() => {
    if (!isInside) {
      targetCameraPos.current = [0, 8, 20]
      targetControlsTarget.current = [0, 4, 0]
    }
  }, [isInside])

  return (
    <>
      {/* 카메라 */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 8, 20]} fov={60} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={!isInside}
        enableZoom={true}
        enableRotate={true}
        minDistance={isInside ? 3 : 5}
        maxDistance={isInside ? 10 : 100}
        minAzimuthAngle={isInside ? -Math.PI / 3 : -Infinity}
        maxAzimuthAngle={isInside ? Math.PI / 3 : Infinity}
        minPolarAngle={isInside ? Math.PI / 4 : 0}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 4, 0]}
      />

      {/* 야외 환경 - 오두막 밖 */}
      <OutdoorEnvironment />

      {/* 눈 내리는 효과 */}
      <SnowParticles count={2000} />

      {/* 밤하늘 별들 */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* 주변 조명 - 실내는 따뜻하게, 야외는 어둡게 */}
      <ambientLight intensity={0.25} color="#dde5f0" />

      {/* 달빛 (야외 주 조명) */}
      <directionalLight
        position={[20, 30, 10]}
        intensity={0.3}
        color="#e0f0ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* 실내 조명 (오두막 내부) - 더 밝게 */}
      <pointLight position={[0, 6, 0]} intensity={1.5} color="#ffe8cc" distance={15} decay={1.5} />
      <pointLight position={[-3, 5, -3]} intensity={1.2} color="#ffd9aa" distance={12} decay={1.5} />
      <pointLight position={[3, 5, -3]} intensity={1.2} color="#ffe4bb" distance={12} decay={1.5} />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#ffddaa" distance={10} decay={1.5} />

      {/* 오두막 내부 */}
      <CozyCabin />

      {/* 크리스마스 트리 - 방 중앙 약간 왼쪽 */}
      <ChristmasTree position={[-2, 0, -2]} onClick={handleTreeClick} />

      {/* 사람 - 트리와 눈사람 사이 */}
      <Person position={[0.5, 0, -1.5]} isInside={isInside} />

      {/* 눈사람 - 트리 옆 */}
      <Snowman position={[2.5, 0, -1]} onClick={handleSnowmanClick} />

      {/* 문 클릭 UI - 밖에 있을 때만 표시 */}
      <DoorClickUI
        position={[0, 5, 8.5]}
        onClick={handleDoorClick}
        visible={!isInside}
      />

      {/* 안개 효과 (야외 깊이감) */}
      <fog attach="fog" args={['#0a1128', 25, 80]} />
    </>
  )
}
