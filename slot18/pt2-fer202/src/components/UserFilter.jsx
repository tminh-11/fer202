import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function UserFilter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    onFilterChange({ search, role, status, sortBy });
  }, [search, role, status, sortBy, onFilterChange]);

  return (
    <Row>
      <Col md={3}>
        <Form.Control
          placeholder="Search username or full name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col md={2}>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Default</option>
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
