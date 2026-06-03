import './App.css'
import SearchableDropdown from './component/atoms/SearchableDropdown'
// import DynamicForm from './component/dynamicForm'
import { demoArr } from './component/kanbanTodo/demo'
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import CounterApp from './component/counterApp/counter_reducer'
// import DynamicSelection from './component/dynamic_checkbox'
// import DynamicNestedCheckbox from './component/nestedTreeview'
// import TodoApp from './component/kanbanTodo'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     {/* <CounterApp hero={heroImg} /> */}
     {/* <DynamicSelection logo={reactLogo} /> */}
     {/* <DynamicNestedCheckbox logo={viteLogo} /> */}
     {/* <TodoApp logo={viteLogo} /> */}
     {/* <DynamicForm /> */}
     <SearchableDropdown list={demoArr} onSelect={()=>{}} />
    </>
  )
}

export default App
