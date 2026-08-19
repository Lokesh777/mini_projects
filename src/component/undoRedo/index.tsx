import { useEffect, useState } from "react";

// 5. Write a React component for Undo and Redo functionality in a text box:
const UndoRedo = () => {
  const [future, setFuture] = useState<string[]>([]);
  const [state, setState] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const handleUndo = ()=> {
   let pop = state.pop()
   if(pop){
     setFuture((prev)=>([...prev, pop]));
    }
    setValue(state[state.length-1])
    setState(state)
  }
  const handleRedo = ()=> {
   let val = future.pop()
   if(val){
    setValue(val)
     setState((prev)=> ([...prev, val]))
   }
  }

  return (
    <>
      <h4>Undo Redo testing</h4>

      <input
        type="text"
        name=""
        id=""
        placeholder="Enter keys..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e)=> {
            console.log(e.key, "items")
            if(e.key  === "Enter"){
                setState((prev)=> ([...prev, value]));
                setValue("")
            }
            if(e.key  === "z"){
               handleUndo()
            }
            if(e.key  === "y"){
               handleRedo()
            }

        }}
      />

      <section>
        <h5>all history</h5>
        <ul>
          {state.map((item) => (
            <li key={item}> {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default UndoRedo;
