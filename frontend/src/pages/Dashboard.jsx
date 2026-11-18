import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { activities } from "../services/api";

const dateLabel = (date) => new Date(date).toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });


export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [weightKg, setWeightKg] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function load() {
    try { setDashboard(await apiRequest("/api/fitness/dashboard")); setError(""); }
    catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);
  async function addProgress(event) {
    event.preventDefault();
    try {
      await apiRequest("/api/fitness/progress", { method: "POST", body: JSON.stringify({ weightKg, note }) });
      setWeightKg(""); setNote(""); setMessage("Progress saved."); await load();
    } catch (e) { setError(e.message); }
  }
  async function cancelBooking(id) {
    try { await apiRequest(`/api/fitness/bookings/${id}/cancel`, { method: "POST" }); await load(); }
    catch (e) { setError(e.message); }
  }
  const user = dashboard?.user || getSavedUser();
  const progress = [...(dashboard?.progress || [])].reverse();
  const minWeight = Math.min(...progress.map((entry) => entry.weightKg));
  const maxWeight = Math.max(...progress.map((entry) => entry.weightKg));
  return (
    <main className="dashboard-page">
      <section className="dashboard-heading"><div><p className="eyebrow">Member Overview</p><h1>Welcome, {user?.name || "Member"}!</h1><p>Your FitZone activity at a glance.</p></div><Link to="/classes" className="btn-primary">Find a class</Link></section>
      {error && <p className="form-error" role="alert">{error}</p>}
      <section className="dashboard-stats">
        <article className="stat-card"><span>Membership</span><h2>{dashboard?.membershipRequest?.membership?.name || "No plan yet"}</h2><p>{dashboard?.membershipRequest?.status ? `Request ${dashboard.membershipRequest.status}` : "Choose a plan to get started"}</p></article>
        <article className="stat-card"><span>Upcoming Bookings</span><h2>{dashboard?.bookings?.length ?? "—"}</h2><p>Reserved classes</p></article>
        <article className="stat-card"><span>Progress Entries</span><h2>{dashboard?.progress?.length ?? "—"}</h2><p>Weight check-ins</p></article>
      </section>
      <section className="dashboard-columns">
        <div className="activity-section"><h2>Your Bookings</h2>
          {dashboard?.bookings?.length ? <div className="activity-list">{dashboard.bookings.map((booking) => <article className="activity-item" key={booking._id}><span className="activity-day">FIT</span><div className="activity-name"><h3>{booking.fitnessClass?.title || "Class"}</h3><p>{booking.fitnessClass?.startsAt ? dateLabel(booking.fitnessClass.startsAt) : "Schedule updated"}{booking.fitnessClass?.trainer?.name ? ` · ${booking.fitnessClass.trainer.name}` : ""}</p></div><button className="text-button" onClick={() => cancelBooking(booking._id)}>Cancel</button></article>)}</div> : <p className="dashboard-muted">No classes booked yet. <Link to="/classes">Browse the schedule</Link>.</p>}
        </div>
        <div className="activity-section"><h2>Membership Request</h2>
          {dashboard?.membershipRequest ? <article className="request-summary"><h3>{dashboard.membershipRequest.membership?.name} plan</h3><p>Status: <strong className={`status-${dashboard.membershipRequest.status}`}>{dashboard.membershipRequest.status}</strong></p><p>Submitted {dateLabel(dashboard.membershipRequest.createdAt)}</p></article> : <p className="dashboard-muted">You do not have a membership request yet. <Link to="/membership">Compare plans</Link>.</p>}
        </div>
      </section>
      <section className="progress-section">
        <div><p className="eyebrow">Small steps add up</p><h2>Weight Progress</h2><p className="dashboard-muted">Optional check-ins are visible only on your account.</p></div>
        <form className="progress-form" onSubmit={addProgress}><label htmlFor="weight">Weight (kg)</label><input id="weight" type="number" min="20" max="400" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} required /><label htmlFor="progress-note">Note (optional)</label><input id="progress-note" maxLength="240" value={note} onChange={(e) => setNote(e.target.value)} placeholder="How did training feel?" /><button className="btn-primary">Save check-in</button>{message && <p className="success-message" role="status">{message}</p>}</form>
        <div className="weight-chart" aria-label="Weight check-ins"><div className="weight-chart-grid">{progress.length ? progress.map((entry) => { const height = maxWeight === minWeight ? 55 : 24 + ((entry.weightKg - minWeight) / (maxWeight - minWeight)) * 70; return <div className="weight-point" key={entry._id}><strong>{entry.weightKg} kg</strong><span style={{ height: `${height}%` }} /><small>{new Date(entry.recordedAt).toLocaleDateString([], { month: "short", day: "numeric" })}</small></div>; }) : <p className="dashboard-muted">Add a check-in to start your progress chart.</p>}</div></div>
      </section>
    </main>
  );
}