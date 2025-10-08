import { useState } from "react";

export default function Booking() {
  const [service, setService] = useState("Choose a service");

  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(135deg, #343a40, #1a0000)", // đỏ thẫm + đen
      }}
    >
      <div className="container">
        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-danger">Reserve Your Table</h2>
          <p className="text-light">
            Enjoy authentic flavors — book your spot now.
          </p>
        </div>

        {/* Form */}
        <form
          className="row g-4 p-4 rounded-4 shadow-lg"
          style={{
            backgroundColor: "rgba(3, 14, 34, 0.9)", // đỏ trong suốt
          }}
        >
          {/* Name */}
          <div className="col-md-4">
            <label className="form-label text-warning">Name</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill bg-dark text-white border-0"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-4">
            <label className="form-label text-warning">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-pill bg-dark text-white border-0"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Service - dropdown button */}
          <div className="col-md-4">
            <label className="form-label text-warning">Service</label>
            <div className="dropdown">
              <button
                className="btn btn-danger btn-lg w-100 rounded-pill dropdown-toggle fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {service}
              </button>
              <ul className="dropdown-menu w-100 bg-dark text-white">
                {["Lunch", "Dinner", "Birthday Party"].map((item) => (
                  <li key={item}>
                    <button
                      className="dropdown-item text-white"
                      type="button"
                      onClick={() => setService(item)}
                      style={{ background: "transparent" }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comment */}
          <div className="col-12">
            <label className="form-label text-warning">Comment</label>
            <textarea
              className="form-control rounded-4 bg-dark text-white border-0"
              rows="4"
              placeholder="Tell us any special requests"
            ></textarea>
          </div>

          {/* Button */}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-danger btn-lg px-5 rounded-pill shadow-sm fw-bold"
              style={{
                backgroundColor: "#b30000",
                border: "none",
              }}
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
