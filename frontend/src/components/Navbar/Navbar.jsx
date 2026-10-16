import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        FitZone<span>.</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/trainers">Trainers</NavLink>
        <NavLink to="/membership">Membership</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <NavLink to="/login" className="login-btn">
        Login
      </NavLink>
    </header>
  );
}
