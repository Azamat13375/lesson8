import { useState } from 'react'
import './App.css'
import MainPage from "./pages/mainPage/MainPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Azamat</h1>
        <MainPage />
    </>
  )
}

export default App
