import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Modal } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";

export default function UserList() {
  const { state, fetchUsers, banUser, applyFilter } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 mb-3">
          <UserFilter onFilterChange={applyFilter} />
        </Card>
        <UserTable users={state.filteredUsers} onView={setSelectedUser} onBan={banUser} />

        {/* Modal xem chi tiết */}
        <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)} centered>
          <Modal.Header closeButton><Modal.Title>User Details</Modal.Title></Modal.Header>
          {selectedUser && (
            <Modal.Body>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
            </Modal.Body>
          )}
        </Modal>
      </Container>
    </>
  );
}
