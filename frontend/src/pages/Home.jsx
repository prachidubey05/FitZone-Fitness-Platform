import { Link } from "react-router-dom";
import { services } from "../services/api";

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">Push Your Limits</p>
          <h1>
            BUILD YOUR
            <br />
            <span>STRONGER</span> SELF.
          </h1>
          <p className="hero-text">
            Your goals. Your effort. Your transformation.
            Start your fitness journey with FitZone.
          </p>

          <div className="hero-buttons">
            <Link to="/membership" className="btn-primary">
              Explore Plans
            </Link>
            <Link to="/trainers" className="btn-outline">
              Meet Our Trainers
            </Link>
          </div>
        </div>
      </section>

      <section className="home-services">
        <p className="eyebrow">What We Offer</p>
        <h2>Train With Purpose</h2>
        <p className="muted">
          Everything you need to work towards your fitness goals.
        </p>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <Link to="/about" className="btn-primary">
          Discover FitZone
        </Link>
      </section>

      <section className="home-cta">
        <p className="eyebrow">Your Next Chapter Starts Now</p>
        <h2>Ready to Get Stronger?</h2>
        <Link to="/register" className="btn-primary">
          Join FitZone
        </Link>
      </section>
    </main>
  );
}