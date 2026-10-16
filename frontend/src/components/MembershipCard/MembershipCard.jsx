import { Link } from "react-router-dom";
import "./MembershipCard.css";

export default function MembershipCard({ plan }) {
  const { name, price, duration, features, popular } = plan;

  return (
    <article className={`plan-card ${popular ? "featured-plan" : ""}`}>
      {popular && <span className="popular-label">POPULAR</span>}

      <h2>{name}</h2>
      <p className="plan-description">Membership plan</p>

      <div className="plan-price">
        <span>₹</span>{price}
      </div>
      <p className="plan-duration">{duration}</p>

      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <span className="check">✓</span> {feature}
          </li>
        ))}
      </ul>

      <Link to="/register" className="plan-button">
        Get Started
      </Link>
    </article>
  );
}