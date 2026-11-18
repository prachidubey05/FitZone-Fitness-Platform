import "./TrainerCard.css";

export default function TrainerCard({ trainer }) {
  const { name, specialty, experience, image } = trainer;
  const imageUrl = image?.startsWith("http") ? image : `https://images.unsplash.com/${image || "photo-1567013127542-490d757e51fc"}?auto=format&fit=crop&w=700&q=80`;

  return (
    <article className="trainer-card">
      <img
        src={imageUrl}
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
