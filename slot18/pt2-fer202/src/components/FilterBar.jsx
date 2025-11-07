import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({ onFilterChange }) {
  const [semester, setSemester] = useState("");
  const [courseName, setCourseName] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Tự động gọi khi bộ lọc thay đổi
  useEffect(() => {
    onFilterChange({ semester, courseName, sortBy });
  }, [semester, courseName, sortBy, onFilterChange]);

  return (
    <Row>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Control
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="All semesters"
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Search course name"
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Sort</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="name-asc">Course name A→Z</option>
            <option value="name-desc">Course name Z→A</option>
            <option value="date-asc">Date ascending</option>
            <option value="date-desc">Date descending</option>
            <option value="amount-asc">Amount ascending</option>
            <option value="amount-desc">Amount descending</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
}
