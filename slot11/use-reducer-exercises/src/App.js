import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import CounterComponent from "./useReducer/CounterComponent";
import LightSwitch from "./useReducer/LightSwitch";
import LoginForm from "./useReducer/LoginForm";
import SignUpForm from "./useReducer/SignUpForm";
import QuestionBank from "./useReducer/QuestionBank";


export default function App() {
  const [active, setActive] = useState("light");

  return (
    <div style={{ padding: 20 }}>
      <h1>React useReducer Exercises</h1>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setActive("count")}>Exercise 1: CounterComponent</button>
        <button onClick={() => setActive("light")}>Exercise 2: LightSwitch</button>
        <button onClick={() => setActive("login")}>Exercise 3: LoginForm</button>
        <button onClick={() => setActive("signup")}>Exercise 4: SignUpForm</button>
        <button onClick={() => setActive("quiz")}>Exercise 5: QuestionBank</button>
      </nav>

      {active === "count" && <CounterComponent />}
      {active === "light" && <LightSwitch />}
      {active === "login" && <LoginForm />}
      {active === "signup" && <SignUpForm />}
      {active === "quiz" && <QuestionBank />}
    </div>
  );
}
