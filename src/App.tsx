// import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CounterApp from './component/counterApp/counter_reducer'
import DynamicSelection from './component/dynamic_checkbox'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     {/* <CounterApp hero={heroImg} /> */}
     <DynamicSelection logo={reactLogo} />
    </>
  )
}

export default App
