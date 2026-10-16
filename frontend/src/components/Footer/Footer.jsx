import { Link } from "react-router-dom";
import "./Footer.css";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">
          FitZone<span>.</span>
        </Link>
        <p>Build strength. Build confidence. Build yourself.</p>
      </div>

      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/trainers">Trainers</Link>
        <Link to="/membership">Membership</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className="copyright">
        © {currentYear} FitZone. Mini Project.
      </p>
    </footer>
  );
}