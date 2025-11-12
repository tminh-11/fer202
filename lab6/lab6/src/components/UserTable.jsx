import React from "react";
import { Table, Button, Image, Badge } from "react-bootstrap";

export default function UserTable({ users, onView, onBan, onToggleAdmin }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Không tìm thấy người dùng nào.</p>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="align-middle">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Họ tên</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td><code>{u.id}</code></td>
            <td>
              <Image
                src={u.avatar}
                width="45"
                height="45"
                roundedCircle
                className="shadow-sm"
                style={{ objectFit: "cover" }}
              />
            </td>
            <td><strong>{u.username}</strong></td>
            <td>{u.fullName}</td>
            <td>
              <Badge bg={u.role === "admin" ? "danger" : "secondary"} className="fs-6">
                {u.role.toUpperCase()}
              </Badge>
            </td>
            <td>
              <Badge bg={u.status === "active" ? "success" : "dark"}>
                {u.status === "active" ? "Hoạt động" : "Bị khóa"}
              </Badge>
            </td>
            <td>
              <div className="btn-group" role="group">
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => onView(u)}
                  title="Xem chi tiết"
                >
                  Xem
                </Button>

                <Button
                  size="sm"
                  variant={u.role === "admin" ? "outline-warning" : "outline-primary"}
                  onClick={() => onToggleAdmin(u.id)}
                  title={u.role === "admin" ? "Bỏ quyền Admin" : "Cấp quyền Admin"}
                >
                  {u.role === "admin" ? "Bỏ Admin" : "Admin"}
                </Button>

                <Button
                  size="sm"
                  variant="outline-danger"
                  disabled={u.status === "locked"}
                  onClick={() => onBan(u.id)}
                  title="Khóa tài khoản"
                >
                  {u.status === "locked" ? "Đã khóa" : "Khóa"}
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}