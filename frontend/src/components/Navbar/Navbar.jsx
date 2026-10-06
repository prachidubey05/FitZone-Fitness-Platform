import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                FitZone
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/trainers">Trainers</Link>
                <Link to="/membership">Membership</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;