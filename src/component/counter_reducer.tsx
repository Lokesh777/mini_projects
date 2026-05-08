import { useReducer, useState, type CSSProperties } from "react"

type CounterAppProp = {
    hero:string
}

type State = {
    count: number
}
type Action = 
| {type: "INCREMENT"} | {type: "DECREMENT"} | {type : "RESET"} | {type: "SET", payload: number}
const counterReducer = (state:State, action: Action) => {
    switch(action.type){
        case "INCREMENT":
            return { count: state.count + 1}
        case "DECREMENT" :
            return {count: Math.max(0, state.count - 1)}
        case "RESET" :
            return {count: 0}
        case "SET":
            return {count: Number(action.payload)}
        default: 
          return state
    }
}

const CounterApp = ({hero}:CounterAppProp) => {
const [state, dispatch] = useReducer(counterReducer, {count:0})
const [value, setValue] = useState<number>(0)

const handleInputChange = () =>{
   dispatch({type:"SET", payload: value})
   setValue(0)
}
    return (
        <section style={container}>
            <h3>Counter App</h3>
            <img src={hero} alt="hero" style={imgStyle} loading="lazy" />
            <h2>{state.count}</h2>
            <section style={sectionSTyle}>
                <button onClick={()=>dispatch({type:"INCREMENT"})}>Increment</button>
                <button disabled={state.count === 0} onClick={()=>dispatch({type:"DECREMENT"})}>Decrement</button>
                <button disabled={state.count === 0} onClick={()=>dispatch({type:"RESET"})}>Reset</button>
                <div style={sectionSTyle}>
                    <input type="text" value={value} onChange={(e)=>setValue(Number(e.target.value))} />
                    <button  disabled={value === 0} onClick={handleInputChange}>Set</button>
                </div>
            </section>
        </section>
    )

}

export default CounterApp

const container : CSSProperties = {
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    gap:'1rem'
}

const imgStyle : CSSProperties = {
    width: 100,
    height: 100,

}

const sectionSTyle : CSSProperties = {
    display:'flex',
    gap:"1rem"
}