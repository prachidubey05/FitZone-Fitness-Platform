import { Link } from "react-router-dom";
import TrainerCard from "../components/TrainerCard/TrainerCard";
import { trainers } from "../services/fitnessService";

export default function Trainers() {
  return (
    <main className="trainers-page">
      <section className="page-banner">
        <p className="eyebrow">Expert Guidance</p>
        <h1>Meet Our <span>Trainers</span></h1>
        <p>Find the right guidance for your fitness goals.</p>
      </section>

      <section className="trainers-section">
        <div className="trainer-grid">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.name} trainer={trainer} />
          ))}
        </div>

        <div className="trainer-cta">
          <h2>Ready to Start Training?</h2>
          <Link to="/membership" className="btn-primary">
            Explore Membership
          </Link>
        </div>
      </section>
    </main>
  );
}
