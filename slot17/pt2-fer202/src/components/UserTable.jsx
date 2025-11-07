import React from "react";
import { Table, Button, Image } from "react-bootstrap";

export default function UserTable({ users, onView, onBan }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td><Image src={u.avatar} width="40" roundedCircle /></td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td>{u.role}</td>
            <td>{u.status}</td>
            <td>
              <Button size="sm" variant="info" className="me-2" onClick={() => onView(u)}>View</Button>
              <Button
                size="sm"
                variant="danger"
                disabled={u.status === "locked"}
                onClick={() => onBan(u.id)}
              >
                Ban
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
