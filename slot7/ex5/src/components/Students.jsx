import React from "react";

const students = [
  {
    id: "DE160162",
    name: "Nguyễn Hữu Quốc Chính",
    img: "/student1.jpg",
  },
  {
    id: "DE160377",
    name: "Chay Vinh Tinh",
    img: "/student2.jpg",
  },
  {
    id: "DE160547",
    name: "Đỗ Ngọc Phúc",
    img: "/student3.jpg",
  },
  {
    id: "DE170498",
    name: "Lê Hoàng Minh",
    img: "/student4.jpg",
  },
];

function Students() {
  return (
    <div className="container my-5">
      <h3 className="text-center fw-bold mb-4">Students Detail</h3>
      <div className="row">
        {students.map((stu) => (
          <div className="col-md-6 mb-4" key={stu.id}>
            <div className="card text-center">
              <img src={stu.img} className="card-img-top" alt={stu.name} />
              <div className="card-body">
                <h6>{stu.name}</h6>
                <p>{stu.id}</p>
                <div className="mb-2">
                  <input type="radio" name={stu.id} id={`${stu.id}-absent`} /> Absent
                  <input type="radio" name={stu.id} id={`${stu.id}-present`} className="ms-3" /> Present
                </div>
                <button className="btn btn-warning">Submit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
