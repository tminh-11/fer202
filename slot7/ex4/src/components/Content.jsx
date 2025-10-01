import React from "react";

function Content() {
  return (
    <div className="container text-center my-5">
      <section id="about" className="mb-5">
        <h4 className="fw-bold">About</h4>
        <p>This is the about section of the website.</p>
      </section>

      <section id="contact">
        <h4 className="fw-bold">Contact</h4>
        <p>For any inquiries, please contact us at example@example.com.</p>
      </section>
    </div>
  );
}

export default Content;
