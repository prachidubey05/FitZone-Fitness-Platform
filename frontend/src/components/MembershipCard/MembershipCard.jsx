// PHASE 3 UPDATE: Membership cards submit a request for the selected database plan.
import "./MembershipCard.css";

export default function MembershipCard({ plan, onRequest }) {
  const { name, price, duration, features, popular } = plan;

  return (
    <article className={`plan-card ${popular ? "featured-plan" : ""}`}>
      {popular && <span className="popular-label">POPULAR</span>}

      <h2>{name}</h2>
      <p className="plan-description">Membership plan</p>

      <div className="plan-price">
        <span>₹</span>{Number(price).toLocaleString("en-IN")}
      </div>
      <p className="plan-duration">{duration}</p>

      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <span className="check">✓</span> {feature}
          </li>
        ))}
      </ul>

      <button type="button" className="plan-button" onClick={onRequest}>Request Membership</button>
    </article>
  );
}

