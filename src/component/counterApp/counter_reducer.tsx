import { useReducer, useState, type CSSProperties } from "react"

type CounterAppProp = {
    hero:string
}

type State = {
    count: number;
    step: number;
    history: number[];
    future: number[];
}
type Action = 
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number }
  | { type: "SET_STEP"; payload: number }
  | { type: "UNDO" }
  | { type: "REDO" };

const historyFetch = (state:State) => {
   return [...state.history, state.count]
}

const counterReducer = (state:State, action: Action) => {
    switch(action.type){
        case "INCREMENT":
            return { 
                ...state,
                count: state.count + state.step,
                history: historyFetch(state),
                future:[]
            }
        case "DECREMENT" :
            return {
                ...state,
                count: Math.max(0, state.count - state.step),
                history: historyFetch(state),
                future:[]
            }
        case "RESET" :
            return {
                ...state,
                count: 0,
                history: historyFetch(state),
                future:[]
            }
        case "SET":
            return {
                ...state,
                count: Number(action.payload),
                history: historyFetch(state),
                future:[]
            }
        case "SET_STEP":
            return {
                ...state,
               step:(action.payload)
            }
        case "UNDO":{
            if(state.history.length === 0) return state;

            const prev = state.history[state.history.length-1]

            return {
                ...state,
                count: prev,
                history: state.history.slice(0, -1),
                future:[state.count, ...state.future]
            }
        }
        case "REDO":{
            if(state.future.length === 0) return state;

            const next = state.future[0]

            return {
                ...state,
                count: next,
                history:[...state.history, state.count],
                future: state.future.slice(1),
            }
        }
        default: 
          return state
    }
}

const initialValue = {
    count: 0,
    step:1,
    history:[],
    future:[]
}
const CounterApp = ({hero}:CounterAppProp) => {
const [state, dispatch] = useReducer(counterReducer, initialValue)
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
                <button onClick={()=>dispatch({type:"INCREMENT"})}>+{state.step}</button>
                <button disabled={state.count === 0} onClick={()=>dispatch({type:"DECREMENT"})}>-{state.step}</button>
                <button disabled={state.count === 0} onClick={()=>dispatch({type:"RESET"})}>Reset</button>
                
            </section>
            <section style={sectionSTyle}>
               
                <button disabled={state.step === 1} onClick={()=>dispatch({type:"SET_STEP", payload:1})}>step1</button>
                <button disabled={state.step === 5} onClick={()=>dispatch({type:"SET_STEP", payload:5})}>step5</button>
                <button disabled={state.step === 10} onClick={()=>dispatch({type:"SET_STEP", payload:10})}>step10</button>
              
            </section>
            <section style={sectionSTyle}>
               
                <button disabled={state.history.length === 0} onClick={()=>dispatch({type:"UNDO"})}>Undo</button>
                <button disabled={state.future.length === 0} onClick={()=>dispatch({type:"REDO"})}>Redo</button>
                
            </section>
            <section style={sectionSTyle}>
               
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