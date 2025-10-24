import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Thêm dòng này
import ConfirmModal from "./ConfirmModal";

const initialState = {
  user: { username: "", password: "" },
  errors: {},
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, user: { ...state.user, [action.field]: action.value } };
    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case "CLEAR_ERRORS":
      const { [action.field]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: true };
    case "CLOSE_MODAL":
      return { ...state, showModal: false, user: { username: "", password: "" }, errors: {} };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const { user, errors, showModal } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });

    if (value.trim() === "")
      dispatch({
        type: "SET_ERRORS",
        field: name,
        message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    else dispatch({ type: "CLEAR_ERRORS", field: name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!user.username.trim()) newErrors.username = "Username is required";
    if (!user.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) =>
        dispatch({ type: "SET_ERRORS", field, message })
      );
      return;
    }

    // ✅ Hiển thị modal khi đăng nhập thành công
    dispatch({ type: "SET_SHOW_MODAL" });

    // ✅ Sau 1.5s tự chuyển hướng sang QuestionBank.jsx
    setTimeout(() => {
      navigate("/quiz");
    }, 1500);
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
    navigate("/quiz"); // ✅ Nếu người dùng click Close thì cũng chuyển sang quiz
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="text-center bg-primary text-white">
              <h4>Login Form (useReducer)</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill">
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={() => dispatch({ type: "RESET_FORM" })}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={showModal}
        title="Login Successful"
        message={`Welcome, ${user.username || "User"}! You have successfully logged in!`}
        onConfirm={handleCloseModal}
      />
    </Container>
  );
}
