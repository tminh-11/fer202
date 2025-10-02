export default function Booking() {
  return (
    <section className="py-5 text-white" style={{ backgroundColor: "#343a40" }}>
      <div className="container">
        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-warning">Reserve Your Table</h2>
          <p className="text-light">
            Plan your perfect dining experience with us — quick and easy.
          </p>
        </div>

        {/* Form */}
        <form className="row g-4 bg-dark bg-opacity-75 p-4 rounded-4 shadow-lg">
          {/* Name */}
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Service */}
          <div className="col-md-4">
            <label className="form-label">Service</label>
            <select className="form-select form-select-lg rounded-pill" required>
              <option value="">Choose a service</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Birthday Party</option>
            </select>
          </div>

          {/* Comment */}
          <div className="col-12">
            <label className="form-label">Comment</label>
            <textarea
              className="form-control rounded-4"
              rows="4"
              placeholder="Tell us any special requests"
            ></textarea>
          </div>

          {/* Button */}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-warning btn-lg px-5 rounded-pill shadow-sm fw-bold"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
