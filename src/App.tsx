// import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import Game1 from './pages/Game1'
import Game2 from './pages/Game2'
import Game3 from './pages/Game3'
import { Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (

      
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="Game1" element={<Game1/>} />
        <Route path="Game2" element={<Game2/>} />
        <Route path="Game3" element={<Game3/>} />
      </Routes>
     
      

    
  )
}

export default App
