import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  fetchUsers,  toggleBanUser,  toggleAdminStatus,  applyFilter,} from "../features/users/usersSlice";
import {  selectFilteredUsers,  selectUsersLoading,  selectUsersError,} from "../features/users/usersSelectors";
import { AppContext } from "../contexts/AppContext";
import Header from "../components/Header";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";

export default function UserList() {
  const dispatch = useDispatch();
  const { state: appState } = useContext(AppContext);

  const filteredUsers = useSelector(selectFilteredUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBan = (id) => {
    dispatch(toggleBanUser({ id, currentUserId: appState.user?.id }));
  };

  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus(userId));
  };

  const handleFilterChange = (filter) => {
    dispatch(applyFilter(filter));
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 mb-3 shadow-sm">
          <UserFilter onFilterChange={handleFilterChange} />
        </Card>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Đang tải danh sách người dùng...</p>
          </div>
        )}

        {error && (
          <div className="text-center my-5">
            <div className="alert alert-danger" role="alert">
              <strong>Lỗi:</strong> {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <Card className="shadow">
            <Card.Body className="p-0">
              <UserTable
                users={filteredUsers}
                onView={setSelectedUser}
                onBan={handleBan}
                onToggleAdmin={handleToggleAdmin}
              />
            </Card.Body>
          </Card>
        )}

        {/* Modal chi tiết người dùng */}
        <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Chi tiết người dùng</Modal.Title>
          </Modal.Header>
          {selectedUser && (
            <Modal.Body>
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={selectedUser.avatar}
                    alt="Avatar"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <p><strong>ID:</strong> <code>{selectedUser.id}</code></p>
                  <p><strong>Username:</strong> {selectedUser.username}</p>
                  <p><strong>Họ tên:</strong> {selectedUser.fullName}</p>
                  <p>
                    <strong>Vai trò:</strong>{" "}
                    <span className={`badge bg-${selectedUser.role === 'admin' ? 'danger' : 'info'}`}>
                      {selectedUser.role.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span className={`badge bg-${selectedUser.status === 'active' ? 'success' : 'secondary'}`}>
                      {selectedUser.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </p>
                  <p><strong>Email:</strong> {selectedUser.email || "Chưa cung cấp"}</p>
                </div>
              </div>
            </Modal.Body>
          )}
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
              Đóng
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}