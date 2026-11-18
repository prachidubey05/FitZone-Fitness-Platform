import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function load() { try { setClasses(await apiRequest("/api/fitness/classes")); setError(""); } catch (e) { setError(e.message); } }
  useEffect(() => { load(); }, []);
  async function book(id) {
    try { const result = await apiRequest(`/api/fitness/classes/${id}/book`, { method: "POST" }); setMessage(result.message); await load(); }
    catch (e) { setError(e.message); }
  }
  return (
    <main className="classes-page">
      <section className="page-banner"><p className="eyebrow">Train Together</p><h1>Class <span>Schedule</span></h1><p>Choose a session and reserve your spot.</p></section>
      <section className="class-list-section">
        {message && <p className="success-message" role="status">{message}</p>}{error && <p className="form-error" role="alert">{error} {error.toLowerCase().includes("token") && <Link to="/login">Log in to book</Link>}</p>}
        {classes.length ? <div className="class-grid">{classes.map((item) => { const remaining = Math.max(0, item.capacity - item.bookedCount); return <article className="class-card" key={item._id}><span className="class-category">{item.category}</span><h2>{item.title}</h2><p>{new Date(item.startsAt).toLocaleString([], { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</p><p>{item.durationMinutes} min · Coach {item.trainer?.name || "FitZone Team"}</p>{item.description && <p>{item.description}</p>}<div className="class-card-footer"><span>{remaining ? `${remaining} spots left` : "Full"}</span><button className="btn-primary" disabled={!remaining} onClick={() => book(item._id)}>Book spot</button></div></article>; })}</div> : !error && <p className="dashboard-muted">No upcoming classes are scheduled yet. Check back soon.</p>}
      </section>
    </main>
  );
}