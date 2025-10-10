// src/components/Account/AddressForm.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import "./forms.css";

export default function AddressForm({ formData, setFormData, errors }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          value={formData.street || ""}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          value={formData.city || ""}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select value={formData.country || ""} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
          <option value="">Choose...</option>
          <option>Vietnam</option>
          <option>USA</option>
          <option>France</option>
          <option>Japan</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          value={formData.zip || ""}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        />
      </Form.Group>
    </Form>
  );
}
