// src/components/Account/AccountForm.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiUser, BiLock } from "react-icons/bi";
import "./forms.css";

export default function AccountForm({ formData, setFormData, errors }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <InputGroup.Text><BiUser /></InputGroup.Text>
          <Form.Control
            value={formData.username || ""}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text><BiLock /></InputGroup.Text>
          <Form.Control
            type="password"
            value={formData.password || ""}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            isInvalid={!!errors.password}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={formData.confirmPassword || ""}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Control
          value={formData.secretQuestion || ""}
          onChange={(e) => setFormData({ ...formData, secretQuestion: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          value={formData.secretAnswer || ""}
          onChange={(e) => setFormData({ ...formData, secretAnswer: e.target.value })}
        />
      </Form.Group>
    </Form>
  );
}
