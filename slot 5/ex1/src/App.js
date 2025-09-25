import logo from './logo.svg';
import './App.css';

import { Exercise1 } from "./component1/exercise1";
import { Exercise2 } from "./component1/exercise2";
import { Exercise3 } from "./component1/exercise3";
import { Exercise4 } from "./component1/exercise4";
import { Exercise5 } from "./component1/exercise5";

function App() {
  return (
    <div>
      <Exercise1 />
      <hr />
      <Exercise2 />
      <hr />
      <Exercise3 />
      <hr />
      <Exercise4 />
      <hr />
      <Exercise5 />
    </div>
  );
}

export default App;

