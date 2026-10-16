import { Link } from "react-router-dom";
import { activities } from "../services/api";

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Member Overview</p>
          <h1>Welcome to FitZone!</h1>
          <p>Here's a sample overview of your fitness journey.</p>
        </div>
        <Link to="/membership" className="btn-primary">
          Explore Plans
        </Link>
      </section>

      <section className="dashboard-stats">
        <article className="stat-card">
          <span>Membership</span>
          <h2>Basic</h2>
          <p>Sample membership</p>
        </article>
        <article className="stat-card">
          <span>Weekly Workouts</span>
          <h2>3</h2>
          <p>Sample activity data</p>
        </article>
        <article className="stat-card">
          <span>Fitness Goal</span>
          <h2>Consistency</h2>
          <p>Keep moving forward</p>
        </article>
      </section>

      <section className="activity-section">
        <h2>Workout Overview</h2>
        <p className="dashboard-muted">
          Example schedule for demonstrating the dashboard UI.
        </p>

        <div className="activity-list">
          {activities.map((item) => (
            <article className="activity-item" key={item.day}>
              <span className="activity-day">{item.day}</span>
              <div className="activity-name">
                <h3>{item.activity}</h3>
                <p>{item.duration}</p>
              </div>
              <span className="activity-status">Planned</span>
            </article>
          ))}
        </div>
      </section>

      <p className="dashboard-note">
        Demo dashboard: membership and workout details are sample data.
        Real user data requires authentication and backend integration.
      </p>
    </main>
  );
}