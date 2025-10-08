import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author, email, linkGithub }) {
  return (
    <footer className="movie-footer">
      <div className="footer-content">
        <div className="footer-info">
          <h5 className="footer-logo">🎬 Movie Management</h5>
          <p className="footer-author">Created by: <span>{author}</span></p>
          <p className="footer-email">
            Contact: <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>

        <div className="footer-links">
          <Button
            variant="link"
            href="https://github.com/tminh-11/fer202.git"
            target="_blank"
            className="github-link"
          >
            🔗 {linkGithub}
          </Button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {author}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default MyFooter;
