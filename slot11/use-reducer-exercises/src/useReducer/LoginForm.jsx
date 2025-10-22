import React, { useReducer } from "react";
import { Modal, Button } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  errors: {},
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SUBMIT":
      const errors = {};
      if (!state.username.trim()) errors.username = "Username required";
      if (!state.password.trim()) errors.password = "Password required";
      return Object.keys(errors).length > 0
        ? { ...state, errors }
        : { ...state, showModal: true, errors: {} };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="exercise-card">
      <h2>🔐 Login Form (useReducer)</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "SUBMIT" });
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USERNAME", payload: e.target.value })
          }
        />
        {state.errors.username && (
          <p className="feedback incorrect">{state.errors.username}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
        />
        {state.errors.password && (
          <p className="feedback incorrect">{state.errors.password}</p>
        )}

        <button type="submit">Login</button>
      </form>

      <Modal show={state.showModal} onHide={() => dispatch({ type: "CLOSE" })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Welcome, {state.username}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE" })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
