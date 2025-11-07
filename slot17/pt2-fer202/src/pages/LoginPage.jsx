import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AppContext } from "../contexts/AppContext";
import ConfirmModal from "../components/ConfirmModal";

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!usernameOrEmail.trim())
      e.usernameOrEmail = "Username or Email is required.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      const res = await api.get("/users", {
        params: { q: usernameOrEmail },
      });

      const user = res.data.find(
        (u) =>
          (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
          u.password === password
      );

      if (!user) {
        setAlertMsg("Invalid username/email or password!");
        return;
      }

      // 🔐 kiểm tra trạng thái & quyền
      if (user.status !== "active") {
        setAlertMsg("Tài khoản bị khóa. Vui lòng liên hệ quản trị viên.");
        return;
      }
      if (user.role !== "admin") {
        setAlertMsg("Bạn không có quyền truy cập. Chỉ admin được phép.");
        return;
      }

      // ✅ đăng nhập thành công
      setCurrentUser(user);
      setShowConfirm(true);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token: "fake-jwt-token" },
      });
    } catch (err) {
      console.error(err);
      setAlertMsg("Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  const handleModalClose = () => {
    setShowConfirm(false);
    navigate("/home");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className="text-center mb-4">TuitionTracker - Login</h3>

          {alertMsg && <Alert variant="danger">{alertMsg}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="usernameOrEmail">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter username or email"
              />
              {errors.usernameOrEmail && (
                <div className="text-danger mt-1">
                  {errors.usernameOrEmail}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-danger mt-1">{errors.password}</div>
              )}
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <ConfirmModal
        show={showConfirm}
        title="Login successful"
        body={
          currentUser
            ? `Welcome, ${currentUser.username}! Login successful.`
            : "Welcome!"
        }
        onClose={handleModalClose}
      />
    </Container>
  );
}
