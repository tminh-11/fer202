export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "linear-gradient(90deg,#1f1f1f,#2c2c2c)", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#" style={{ color: "#ff4d4d" }}>🍕 Pizza House</a>
        <button className="navbar-toggler bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link text-light" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link text-light" href="#">About Us</a></li>
            <li className="nav-item"><a className="nav-link text-light" href="#">Contact</a></li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2 rounded-pill" type="search" placeholder="Search" />
            <button className="btn btn-danger rounded-pill fw-bold" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
