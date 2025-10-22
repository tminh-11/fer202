import React, { useReducer } from "react";
import { Modal, Button } from "react-bootstrap";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
  showModal: false,
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT":
      const errors = {};
      if (!state.username) errors.username = "Username required";
      if (!state.email.includes("@")) errors.email = "Invalid email";
      if (state.password.length < 6)
        errors.password = "Password must be ≥ 6 chars";
      if (state.password !== state.confirm)
        errors.confirm = "Passwords do not match";
      return Object.keys(errors).length > 0
        ? { ...state, errors }
        : { ...state, errors: {}, showModal: true };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="exercise-card">
      <h2>📝 Sign Up Form (useReducer)</h2>

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
            dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
          }
        />
        {state.errors.username && (
          <p className="feedback incorrect">{state.errors.username}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
          }
        />
        {state.errors.email && (
          <p className="feedback incorrect">{state.errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
          }
        />
        {state.errors.password && (
          <p className="feedback incorrect">{state.errors.password}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          value={state.confirm}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "confirm", value: e.target.value })
          }
        />
        {state.errors.confirm && (
          <p className="feedback incorrect">{state.errors.confirm}</p>
        )}

        <button type="submit">Register</button>
      </form>

      <Modal show={state.showModal} onHide={() => dispatch({ type: "CLOSE" })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Welcome <strong>{state.username}</strong>! 🎉
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE" })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
