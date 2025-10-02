export default function Hero() {
  return (
    <div className="position-relative text-center text-white">
      <div style={{ height: "450px", overflow: "hidden" }}>
        <img src="/hero-pizza.webp" className="w-100 h-100 object-fit-cover" alt="Pizza" />
        {/* Dark overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(0,0,0,0.55)" }}></div>
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="display-4 fw-bold" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>Neapolitan Pizza</h2>
        <p className="lead">Authentic Italian tradition, fresh from the oven.</p>
        <button className="btn btn-danger rounded-pill px-4 fw-bold">Order Now</button>
      </div>
    </div>
  );
}
