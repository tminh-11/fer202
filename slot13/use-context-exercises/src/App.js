import logo from './logo.svg';
import './App.css';
import React from "react";
import { ThemeProvider } from "./ex1/contexts/ThemeContext";
import CounterComponent from "./ex1/components/CounterComponent";
import LightSwitch from "./ex1/components/LightSwitch";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: "100vh",
          padding: "20px",
          transition: "all 0.3s ease",
        }}
      >
        <CounterComponent />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;
