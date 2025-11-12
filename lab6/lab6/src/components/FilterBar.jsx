import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({ onFilterChange }) {
  const [semester, setSemester] = useState("");
  const [courseName, setCourseName] = useState("");
  const [sortBy, setSortBy] = useState("");

  const triggerFilter = useCallback(() => {
    onFilterChange({ semester, courseName, sortBy });
  }, [semester, courseName, sortBy, onFilterChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerFilter();
    }, 300);
    return () => clearTimeout(timer);
  }, [semester, courseName, sortBy, triggerFilter]);

  return (
    <Row className="g-3">
      <Col md={4}>
        <Form.Control
          placeholder="Học kỳ (VD: 2024-2025)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Control
          placeholder="Tìm tên môn học"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Mặc định</option>
          <option value="name-asc">Tên môn A→Z</option>
          <option value="name-desc">Tên môn Z→A</option>
          <option value="date-asc">Ngày cũ → mới</option>
          <option value="date-desc">Ngày mới → cũ</option>
          <option value="amount-asc">Số tiền tăng dần</option>
          <option value="amount-desc">Số tiền giảm dần</option>
        </Form.Select>
      </Col>
    </Row>
  );
}