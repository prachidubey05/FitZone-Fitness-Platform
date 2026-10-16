import MembershipCard from "../components/MembershipCard/MembershipCard";
import { plans } from "../services/api";

export default function Membership() {
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
