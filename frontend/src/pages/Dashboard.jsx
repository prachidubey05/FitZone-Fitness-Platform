import { Link, Navigate } from "react-router-dom";
import { getSavedUser } from "../services/api";

export default function Dashboard() {
  const user = getSavedUser();
  if (!user || !user.name || !localStorage.getItem("fitzone_token")) return <Navigate to="/login" replace />;

  return (
    <section className="page-section container dashboard">
      <p className="eyebrow">YOUR FITZONE</p>
      <h1 className="page-title">Welcome, <span>{(user.name || "Member").split(" ")[0]}.</span></h1>
      <p className="page-intro">Your account is ready. Explore trainers and membership options to plan your next step.</p>
      <div className="dashboard-grid">
        <article className="dashboard-card"><span className="dashboard-icon">◎</span><h3>Account details</h3><p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.email}</p></article>
        <article className="dashboard-card"><span className="dashboard-icon">↗</span><h3>Find your plan</h3><p className="muted">Compare available plans and their features.</p><Link className="text-link" to="/membership">Explore memberships →</Link></article>
        <article className="dashboard-card"><span className="dashboard-icon">✦</span><h3>Meet the coaches</h3><p className="muted">Discover trainer specializations and experience.</p><Link className="text-link" to="/trainers">Meet our trainers →</Link></article>
      </div>
      <p className="notice">This starter dashboard displays account information. Membership purchase and payment are not implemented.</p>
    </section>
  );
}

