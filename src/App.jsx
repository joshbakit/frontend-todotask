import React, { useState } from 'react'
import './App.css'
import Home from './components/Home'


function App() {

  const [todo, setTodo] = useState([])



  return (
    <>
      <Home />
    </>
  )
}

export default App
