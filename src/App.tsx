// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CounterApp from './component/counterApp/counter_reducer'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <CounterApp hero={heroImg} />
    </>
  )
}

export default App
