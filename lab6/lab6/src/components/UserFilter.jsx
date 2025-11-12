import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function UserFilter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Dùng useCallback để tránh tạo hàm mới liên tục
  const triggerFilter = useCallback(() => {
    onFilterChange({ search, role, status, sortBy });
  }, [search, role, status, sortBy, onFilterChange]);

  // GỌI CHỈ KHI NGƯỜI DÙNG THAY ĐỔI GIÁ TRỊ
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      triggerFilter();
    }, 300); // debounce 300ms cho search

    return () => clearTimeout(timeoutId);
  }, [search, role, status, sortBy, triggerFilter]);

  return (
    <Row className="g-3">
      <Col md={3}>
        <Form.Control
          placeholder="Tìm username hoặc họ tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col md={2}>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="locked">Bị khóa</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Mặc định</option>
          <option value="name-asc">Tên A→Z</option>
          <option value="name-desc">Tên Z→A</option>
          <option value="role-asc">Vai trò A→Z</option>
          <option value="role-desc">Vai trò Z→A</option>
        </Form.Select>
      </Col>
    </Row>
  );
}