// PHASE 3 UPDATE: Membership plans load from the backend and support member requests.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MembershipCard from "../components/MembershipCard/MembershipCard";
import { apiRequest } from "../services/api";

export default function Membership() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { apiRequest("/api/memberships").then(setPlans).catch((e) => setError(e.message)); }, []);
  async function requestPlan(plan) {
    if (!localStorage.getItem("token")) {
      setError("Log in to submit a membership request.");
      setMessage("");
      return;
    }
    try {
      const result = await apiRequest("/api/fitness/membership-requests", { method: "POST", body: JSON.stringify({ membershipId: plan._id }) });
      setMessage(result.message);
      setError("");
    } catch (e) { setError(e.message); setMessage(""); }
  }
  return (
    <main className="membership-page">
      <section className="page-banner"><p className="eyebrow">Invest In Yourself</p><h1>Choose Your <span>Plan</span></h1><p>Find a membership that matches your fitness goals.</p></section>
      <section className="plans-section">
        {message && <p className="success-message" role="status">{message}</p>}
        {error && <p className="form-error" role="alert">{error} {error.toLowerCase().includes("log in") || error.toLowerCase().includes("token") ? <Link to="/login">Log in</Link> : null}</p>}
        {plans.length ? <div className="plans-grid">{plans.map((plan) => <MembershipCard key={plan._id} plan={plan} onRequest={() => requestPlan(plan)} />)}</div> : !error && <p className="dashboard-muted">Membership plans will appear here once added by the gym.</p>}
      </section>
    </main>
  );
}

