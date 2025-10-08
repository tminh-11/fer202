export default function Hero() {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src="/hero-pizza.webp"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="Pizza"
          />
          {/* Caption dưới ảnh */}
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h5 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
              Neapolitan Pizza
            </h5>
            <p style={{ fontSize: "1rem" }}>
              Authentic Italian tradition, fresh from the oven.
            </p>
            <button className="btn btn-danger rounded-pill px-4 fw-bold">
              Order Now
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src="/hero-pizza2.jpg"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="Pizza 2"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h5 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
              Cheese Lovers
            </h5>
            <p style={{ fontSize: "1rem" }}>
              Melted cheese perfection for every slice.
            </p>
            <button className="btn btn-warning rounded-pill px-4 fw-bold">
              Order Now
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src="/hero-pizza3.webp"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="Pizza 3"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h5 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
              Family Combo
            </h5>
            <p style={{ fontSize: "1rem" }}>
              Sharing happiness with every slice.
            </p>
            <button className="btn btn-success rounded-pill px-4 fw-bold">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
