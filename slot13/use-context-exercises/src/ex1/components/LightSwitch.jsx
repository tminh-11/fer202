// ex1/components/LightSwitch.jsx
import React, { useReducer } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";
import "./LightSwitch.css";
const initialState = { isOn: false };

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { isOn: !state.isOn };
    case "turnOn":
      return { isOn: true };
    case "turnOff":
      return { isOn: false };
    default:
      return state;
  }
}

export default function LightSwitch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
      }}
    >
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Đèn hiện đang: {state.isOn ? "Bật" : "Tắt"}
      </p>

      <Button
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          background: theme === "light" ? "#6c757d" : "#f8f9fa",
          color: theme === "light" ? "#ffffff" : "#000000",
        }}
      >
        {theme === "light" ? "Dark" : "Light"}
      </Button>

      <Button
        onClick={() => dispatch({ type: "toggle" })}
        style={{ ...buttonStyle, background: "#007bff", color: "white" }}
      >
        Chuyển Đổi
      </Button>

      <Button
        onClick={() => dispatch({ type: "turnOn" })}
        style={{ ...buttonStyle, background: "#28a745", color: "white" }}
      >
        Bật Đèn
      </Button>

      <Button
        onClick={() => dispatch({ type: "turnOff" })}
        style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
      >
        Tắt Đèn
      </Button>
    </div>
  );
}
