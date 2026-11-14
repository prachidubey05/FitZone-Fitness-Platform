// PHASE 3 UPDATE: Navigation reflects the signed-in role and supports logout.
import { Link, useNavigate } from "react-router-dom";
import { clearSession, getSavedUser } from "../../services/api";
import "./Navbar.css";

export default function Navbar() {
    const user = getSavedUser();
    const navigate = useNavigate();
    function logout() { clearSession(); navigate("/"); }
    return (
        <nav className="navbar">
            <div className="logo">
                FitZone
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/trainers">Trainers</Link>
                <Link to="/classes">Classes</Link>
                <Link to="/membership">Membership</Link>
                <Link to="/contact">Contact</Link>
                {user ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Login</Link>}
                {user?.role === "admin" && <Link to="/admin">Admin</Link>}
                {user && <button className="nav-logout" onClick={logout}>Log out</button>}
            </div>
        </nav>
    );
}

// export default Navbar;

