// src/components/Movie/Filter.jsx
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Filter.css";

export default function Filter({ onApply }) {
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const apply = () => {
    onApply({ search, yearRange, sortBy });
  };

  const reset = () => {
    setSearch("");
    setYearRange("");
    setSortBy("");
    onApply({ search: "", yearRange: "", sortBy: "" });
  };

  return (
    <Card className="mb-3 filter-card">
      <Card.Body className="d-flex flex-wrap gap-2 align-items-center">
        <Form.Control
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 420 }}
        />

        <Form.Select value={yearRange} onChange={(e) => setYearRange(e.target.value)} style={{ maxWidth: 220 }}>
          <option value="">All years</option>
          <option value="<=2000">Year ≤ 2000</option>
          <option value="2001-2015">2001 - 2015</option>
          <option value=">2015">Year &gt; 2015</option>
        </Form.Select>

        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ maxWidth: 220 }}>
          <option value="">Sort</option>
          <option value="year-asc">Year ↑</option>
          <option value="year-desc">Year ↓</option>
          <option value="title-asc">Title A→Z</option>
          <option value="title-desc">Title Z→A</option>
          <option value="dur-asc">Duration ↑</option>
          <option value="dur-desc">Duration ↓</option>
        </Form.Select>

        <div className="ms-auto d-flex gap-2">
          <Button variant="outline-light" onClick={reset}>Reset</Button>
          <Button variant="warning" onClick={apply}>Apply</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
