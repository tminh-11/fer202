import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import CounterComponent from "./useState/CounterComponent";
import LightSwitch from "./useState/LightSwitch";
import LoginForm from "./useState/LoginForm";
import LoginForm2 from "./useState/LoginForm2";
import SearchItem from "./useState/SearchItem";
import AccountSearch from "./useState/AccountSearch";
import RegisterForm from "./useState/RegisterForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>useState Examples</h1>
      <hr />
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <AccountSearch />
      <RegisterForm />
    </div>
  );
}

export default App;
