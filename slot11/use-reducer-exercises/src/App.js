import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import CounterComponent from "./useReducer/CounterComponent";
import LightSwitch from "./useReducer/LightSwitch";
import LoginForm from "./useReducer/LoginForm";
import SignUpForm from "./useReducer/SignUpForm";
import QuestionBank from "./useReducer/QuestionBank";

export default function App() {
  return (
    <Container className="mt-3">
      <h1 className="mb-4">React useReducer Exercises</h1>
      <nav className="d-flex gap-2 mb-3">
        <Link to="/counter"><Button>Counter</Button></Link>
        <Link to="/light"><Button>LightSwitch</Button></Link>
        <Link to="/login"><Button>Login</Button></Link>
        <Link to="/signup"><Button>Sign Up</Button></Link>
        <Link to="/quiz"><Button>Question Bank</Button></Link>
      </nav>

      <Routes>
        <Route path="/counter" element={<CounterComponent />} />
        <Route path="/light" element={<LightSwitch />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/quiz" element={<QuestionBank />} />
      </Routes>
    </Container>
  );
}