import "./TrainerCard.css";

export default function TrainerCard({ trainer }) {
  const { name, specialty, experience, image } = trainer;

  return (
    <article className="trainer-card">
      <img
        src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80`}
        alt={name}
      />
      <div className="trainer-info">
        <span className="trainer-badge">FITZONE TRAINER</span>
        <h2>{name}</h2>
        <p className="trainer-specialty">{specialty}</p>
        <p className="trainer-experience">{experience}</p>
      </div>
    </article>
  );
}