import { Link } from "react-router-dom";

const values = [
  { title: "Our Mission", text: "Make fitness accessible and help people build healthier lifestyles." },
  { title: "Our Vision", text: "Create a welcoming fitness community that inspires consistent progress." },
  { title: "Our Approach", text: "Combine training, guidance and consistency to support individual goals." }
];

export default function About() {
  return (
    <main className="about-page">
      <section className="page-banner">
        <p className="eyebrow">Get To Know Us</p>
        <h1>About <span>FitZone</span></h1>
        <p>Your fitness journey deserves the right environment.</p>
      </section>

      <section className="about-content">
        <div className="about-image" role="img" aria-label="Gym workout area" />

        <div className="about-text">
          <p className="eyebrow">Who We Are</p>
          <h2>More Than Just a Gym</h2>
          <p>
            FitZone is a fitness platform designed to help users explore
            gym facilities, discover trainers and compare membership plans.
          </p>
          <p>
            Our goal is to make fitness information simple to access
            through a modern and responsive web experience.
          </p>
          <Link to="/trainers" className="btn-primary">Meet Our Trainers</Link>
        </div>
      </section>

      <section className="values-section">
        <p className="eyebrow">What Drives Us</p>
        <h2>Our Mission & Values</h2>

        <div className="value-grid">
          {values.map((item) => (
            <article className="value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}