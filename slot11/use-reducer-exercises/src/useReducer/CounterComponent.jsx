import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="exercise-card">
      <h2>🎯 Counter (useReducer)</h2>
      <h1 style={{ fontSize: "3rem" }}>{state.count}</h1>
      <div className="counter-buttons">
        <button className="inc" onClick={() => dispatch({ type: "increment" })}>
          + Increment
        </button>
        <button className="dec" onClick={() => dispatch({ type: "decrement" })}>
          − Decrement
        </button>
        <button className="reset" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>
    </div>
  );
}
