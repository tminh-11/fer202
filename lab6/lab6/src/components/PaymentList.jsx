import React from "react";
import { Table } from "react-bootstrap";

export default function PaymentList({ payments = [] }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center text-muted my-5">
        <p>Chưa có thanh toán nào.</p>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Học kỳ</th>
          <th>Môn học</th>
          <th>Ngày thanh toán</th>
          <th className="text-end">Số tiền</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p, idx) => (
          <tr key={p.id}>
            <td>{idx + 1}</td>
            <td>{p.semester}</td>
            <td>{p.courseName}</td>
            <td>{new Date(p.date).toLocaleDateString("vi-VN")}</td>
            <td className="text-end fw-bold">
              {p.amount.toLocaleString("vi-VN")} VND
            </td>
            <td>
              <span
                className={`badge bg-${
                  p.status === "SUCCESS" ? "success" : "warning"
                }`}
              >
                {p.status === "SUCCESS" ? "Thành công" : "Đang xử lý"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}