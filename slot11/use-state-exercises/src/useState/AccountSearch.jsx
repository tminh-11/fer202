import React, { useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

const accounts = [
  {
    id: 1,
    username: "john_doe",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    username: "jane_smith",
    password: "abcdef",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "alex123",
    password: "pass1234",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "maria98",
    password: "password",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

function AccountSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4 text-primary">🔍 Tìm kiếm tài khoản</h3>

      <Form.Control
        type="text"
        placeholder="Nhập username cần tìm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Row>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((acc) => (
            <Col md={3} key={acc.id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={acc.avatar}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="text-center">@{acc.username}</Card.Title>
                  <Card.Text className="text-muted text-center">
                    Password: {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted mt-3">Không tìm thấy kết quả 😢</p>
        )}
      </Row>
    </Container>
  );
}

export default AccountSearch;
