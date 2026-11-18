import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MembershipCard from "../components/MembershipCard/MembershipCard";
import { plans } from "../services/api";

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
      <section className="page-banner">
        <p className="eyebrow">Invest In Yourself</p>
        <h1>Choose Your <span>Plan</span></h1>
        <p>Find a membership that matches your fitness goals.</p>
      </section>

      <section className="plans-section">
        <div className="plans-grid">
          {plans.map((plan) => (
            <MembershipCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="plan-note">
          Prices are sample project data and can be updated by the gym.
        </p>
      </section>
    </main>
  );
}
