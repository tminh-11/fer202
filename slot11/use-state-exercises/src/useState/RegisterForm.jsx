import React, { useState } from "react";
import {  Form,  Button,  Container,  Row,  Col,  Card,  Modal,  Toast,} from "react-bootstrap";

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🔍 Validate từng trường
  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!/^[a-zA-Z0-9._]{3,}$/.test(value.trim()))
          return "Username phải ≥3 ký tự và chỉ gồm chữ, số, _ hoặc .";
        break;
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim()))
          return "Email không hợp lệ";
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        )
          return "Password ≥8 ký tự, có hoa, thường, số và ký tự đặc biệt";
        break;
      case "confirm":
        if (value !== form.password) return "Password không khớp";
        break;
      default:
        return "";
    }
    return "";
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Kiểm tra tất cả trường
  const isFormValid = () =>
    Object.values(form).every((v) => v.trim() !== "") &&
    Object.values(errors).every((e) => e === "");

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // Reset form
  const handleCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header>
              <h3 className="text-center text-primary">Đăng Ký Tài Khoản</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {["username", "email", "password", "confirm"].map((field) => (
                  <Form.Group className="mb-3" controlId={field} key={field}>
                    <Form.Label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Form.Label>
                    <Form.Control
                      type={
                        field.includes("password") ? "password" : "text"
                      }
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      isInvalid={!!errors[field]}
                      placeholder={`Nhập ${field}...`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[field]}
                    </Form.Control.Feedback>
                  </Form.Group>
                ))}

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="success" type="submit" disabled={!isFormValid()}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Toast thông báo */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="success"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Toast.Body>✅ Submitted successfully!</Toast.Body>
      </Toast>

      {/* ✅ Modal hiển thị thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Đăng Ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><b>Username:</b> {form.username}</p>
              <p><b>Email:</b> {form.email}</p>
              <p><b>Password:</b> {form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
