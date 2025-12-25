import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import './App.css'

function App() {
  const [isInside, setIsInside] = useState(false)
  const [isNight, setIsNight] = useState(true) // 처음은 밤

  return (
    <div className="app-container">
      <div className="title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <h1>Merry Christmas HIARC!!!</h1>
          {!isInside && (
            <button
              className="toggle-button"
              onClick={() => setIsNight(!isNight)}
            >
              {isNight ? '☀️ 낮' : '🌙 밤'}
            </button>
          )}
          {isInside && (
            <button
              className="exit-button"
              onClick={() => setIsInside(false)}
            >
              🚪 나가기
            </button>
          )}
        </div>
        <p>마우스로 드래그하여 회전, 휠로 확대/축소</p>
      </div>
      <Canvas shadows>
        <Scene isInside={isInside} setIsInside={setIsInside} isNight={isNight} />
      </Canvas>
    </div>
  )
}

export default App
