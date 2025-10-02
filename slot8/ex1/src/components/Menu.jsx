export default function Menu() {
  return (
    <section className="py-5" style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div className="container">
        <h2 className="mb-4 fw-bold text-center">Our Menu</h2>
        <div className="row g-4">
          
          {/* Pizza 1 */}
          <div className="col-md-3 d-flex">
            <div className="card w-100 h-100 text-center text-white" style={{ backgroundColor: "#1c1c1c", borderRadius: "15px" }}>
              <span className="badge bg-warning position-absolute m-2">SALE</span>
              <img src="/margherita.jpeg" className="card-img-top" alt="Pizza" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="flex-grow-1 fw-bold">Margherita Pizza</h5>
                <p><del>$40.00</del> <span className="text-danger fw-bold">$20.00</span></p>
                <button className="btn btn-danger rounded-pill mt-auto">Buy</button>
              </div>
            </div>
          </div>

          {/* Pizza 2 */}
          <div className="col-md-3 d-flex">
            <div className="card w-100 h-100 text-center text-white" style={{ backgroundColor: "#1c1c1c", borderRadius: "15px" }}>
              <img src="/mushroom.jpeg" className="card-img-top" alt="Pizza" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="flex-grow-1 fw-bold">Mushroom Pizza</h5>
                <p>$25.00</p>
                <button className="btn btn-danger rounded-pill mt-auto">Buy</button>
              </div>
            </div>
          </div>

          {/* Pizza 3 */}
          <div className="col-md-3 d-flex">
            <div className="card w-100 h-100 text-center text-white" style={{ backgroundColor: "#1c1c1c", borderRadius: "15px" }}>
              <span className="badge bg-success position-absolute m-2">NEW</span>
              <img src="/hawaiian.jpeg" className="card-img-top" alt="Pizza" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="flex-grow-1 fw-bold">Hawaiian Pizza</h5>
                <p>$30.00</p>
                <button className="btn btn-danger rounded-pill mt-auto">Buy</button>
              </div>
            </div>
          </div>

          {/* Pizza 4 */}
          <div className="col-md-3 d-flex">
            <div className="card w-100 h-100 text-center text-white" style={{ backgroundColor: "#1c1c1c", borderRadius: "15px" }}>
              <span className="badge bg-warning position-absolute m-2">SALE</span>
              <img src="/pesto.webp" className="card-img-top" alt="Pizza" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="flex-grow-1 fw-bold">Pesto Pizza</h5>
                <p><del>$50.00</del> <span className="text-danger fw-bold">$30.00</span></p>
                <button className="btn btn-danger rounded-pill mt-auto">Buy</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
