import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navigation from "./components/Navigation";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navigation />

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* --- Routes cơ bản --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />

          {/* --- Route động --- */}
          <Route path="/users/:id" element={<UserProfile />} />

          {/* --- 404 --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
