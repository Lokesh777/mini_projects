import { useReducer, useState, type CSSProperties } from "react";

type CounterProps = {
  hero: string;
};

type State = {
  count: number;
};
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };
const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: Math.max(0, state.count - 1) };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: Number(action.payload) || 0 };
    default:
      return state;
  }
};
const CounterApp = ({ hero }: CounterProps) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const [value, setValue] = useState<number>(0);

  const handleInput = () => {
    dispatch({ type: "SET", payload: value });
  };
  return (
    <section style={container}>
      <h2>Counter App</h2>
      <img src={hero} width={100} height={100} />

      <h3 style={{
        background: 'teal', padding: "1rem 1.4rem", borderRadius: "50%"
      }}>{state.count}</h3>
      <section style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <div style={inputBox}>
        <input
          type="number"
          onChange={(e) => setValue(Number(e.target.value))} 
          style={{maxWidth: 50}}
          value={value}
        />
        <button onClick={handleInput}>Set</button>
      </div>
      </section>
    </section>
  );
};

export default CounterApp;

const container: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem"
};

const inputBox : CSSProperties = {
    // display:'flex',
}