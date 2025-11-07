import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({ payments = [], onFiltered }) {
  const [semester, setSemester] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  // derive unique semesters for a dropdown
  const semesters = Array.from(new Set(payments.map(p => p.semester)));

  useEffect(() => {
    let list = [...payments];

    if (semester) list = list.filter(p => p.semester === semester);

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p => (p.courseName || "").toLowerCase().includes(q));
    }

    if (sortBy) {
      switch (sortBy) {
        case "name-asc":
          list.sort((a,b)=> a.courseName.localeCompare(b.courseName));
          break;
        case "name-desc":
          list.sort((a,b)=> b.courseName.localeCompare(a.courseName));
          break;
        case "date-asc":
          list.sort((a,b)=> new Date(a.date) - new Date(b.date));
          break;
        case "date-desc":
          list.sort((a,b)=> new Date(b.date) - new Date(a.date));
          break;
        case "amount-asc":
          list.sort((a,b)=> a.amount - b.amount);
          break;
        case "amount-desc":
          list.sort((a,b)=> b.amount - a.amount);
          break;
        default:
          break;
      }
    }

    onFiltered(list);
  }, [semester, query, sortBy, payments]);

  return (
    <Row className="align-items-end">
      <Col md={4}>
        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Select value={semester} onChange={(e)=>setSemester(e.target.value)}>
            <option value="">All</option>
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group>
          <Form.Label>Course name</Form.Label>
          <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by course name" />
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group>
          <Form.Label>Sort</Form.Label>
          <Form.Select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
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
