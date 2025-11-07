import React from "react";
import { Table, Spinner } from "react-bootstrap";

export default function PaymentList({ payments = [], loading = false }) {
  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  if (!payments.length) return <div>No payments found.</div>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Semester</th>
          <th>Course name</th>
          <th>Date</th>
          <th className="text-end">Amount</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p, idx) => (
          <tr key={p.id}>
            <td>{idx + 1}</td>
            <td>{p.semester}</td>
            <td>{p.courseName}</td>
            <td>{new Date(p.date).toLocaleDateString()}</td>
            <td className="text-end">{p.amount.toLocaleString()} VND</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
