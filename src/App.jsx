import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import './App.css'

function App() {
  const [isInside, setIsInside] = useState(false)

  return (
    <div className="app-container">
      <div className="title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <h1>Merry Christmas HIARC!!!</h1>
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
        <Scene isInside={isInside} setIsInside={setIsInside} />
      </Canvas>
    </div>
  )
}

export default App
