import React, { useReducer } from "react";

function lightReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { light: !state.light };
    default:
      return state;
  }
}

export default function LightSwitch() {
  const [state, dispatch] = useReducer(lightReducer, { light: true });

  return (
    <div className={`exercise-card ${state.light ? "light" : "dark"}`}>
      <h2>💡 Light Switch</h2>
      <p style={{ fontSize: "1.5rem" }}>
        The light is {state.light ? "ON 💡" : "OFF 🌑"}
      </p>
      <button onClick={() => dispatch({ type: "TOGGLE" })}>
        {state.light ? "Turn Off" : "Turn On"}
      </button>
    </div>
  );
}
