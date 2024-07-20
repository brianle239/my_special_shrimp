// import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import Test from './pages/Test'

import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Test" element={<Test/>} />
        </Routes>
      </HashRouter>
      

    
  )
}

export default App
