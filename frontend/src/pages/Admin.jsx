
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const emptyTrainer = { name: "", specialization: "", experience: "", image: "", description: "" };
const emptyPlan = { name: "", price: "", duration: "1 month", features: "" };
const emptyClass = { title: "", category: "", startsAt: "", durationMinutes: 45, capacity: 12, trainer: "", description: "" };
const localDateTime = (value) => { const date = new Date(value); date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); return date.toISOString().slice(0, 16); };

export default function Admin() {
  const [data, setData] = useState({ members: [], requests: [], bookings: [], classes: [] });
  const [trainers, setTrainers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [trainerForm, setTrainerForm] = useState(emptyTrainer);
  const [planForm, setPlanForm] = useState(emptyPlan);
  const [classForm, setClassForm] = useState(emptyClass);
  const [editing, setEditing] = useState({ trainer: "", plan: "", class: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function load() {
    try {
      const [overview, trainerRows, planRows] = await Promise.all([
        apiRequest("/api/fitness/admin/overview"), apiRequest("/api/trainers"), apiRequest("/api/memberships")
      ]);
      setData(overview); setTrainers(trainerRows); setPlans(planRows); setError("");
    } catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);
  async function action(work, success) {
    try { await work(); setMessage(success); setError(""); await load(); return true; }
    catch (e) { setError(e.message); setMessage(""); return false; }
  }
  async function submitTrainer(event) {
    event.preventDefault();
    const id = editing.trainer;
    if (await action(() => apiRequest(id ? `/api/trainers/${id}` : "/api/trainers", { method: id ? "PUT" : "POST", body: JSON.stringify({ ...trainerForm, experience: Number(trainerForm.experience) }) }), id ? "Trainer updated." : "Trainer added.")) {
      setTrainerForm(emptyTrainer); setEditing({ ...editing, trainer: "" });
    }
  }
  async function submitPlan(event) {
    event.preventDefault();
    const id = editing.plan;
    if (await action(() => apiRequest(id ? `/api/memberships/${id}` : "/api/memberships", { method: id ? "PUT" : "POST", body: JSON.stringify({ ...planForm, price: Number(planForm.price), features: planForm.features.split(",").map((feature) => feature.trim()).filter(Boolean) }) }), id ? "Plan updated." : "Plan added.")) {
      setPlanForm(emptyPlan); setEditing({ ...editing, plan: "" });
    }
  }
  async function submitClass(event) {
    event.preventDefault();
    const id = editing.class;
    if (await action(() => apiRequest(id ? `/api/fitness/classes/${id}` : "/api/fitness/classes", { method: id ? "PUT" : "POST", body: JSON.stringify({ ...classForm, startsAt: new Date(classForm.startsAt).toISOString(), durationMinutes: Number(classForm.durationMinutes), capacity: Number(classForm.capacity), trainer: classForm.trainer || undefined }) }), id ? "Class updated." : "Class added to the schedule.")) {
      setClassForm(emptyClass); setEditing({ ...editing, class: "" });
    }
  }
  async function setRequestStatus(id, status) {
    await action(() => apiRequest(`/api/fitness/admin/membership-requests/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }), `Request ${status}.`);
  }
  async function remove(path, label) {
    if (!window.confirm(`Delete this ${label}?`)) return;
    await action(() => apiRequest(path, { method: "DELETE" }), `${label} deleted.`);
  }
  return (
    <main className="admin-page">
      <section className="dashboard-heading"><div><p className="eyebrow">FitZone Management</p><h1>Admin Dashboard</h1><p>Manage the schedule, plans, coaches, and member requests.</p></div><button className="btn-outline" onClick={load}>Refresh data</button></section>
      {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="success-message" role="status">{message}</p>}
      <section className="admin-stats"><article className="stat-card"><span>Members</span><h2>{data.members.length}</h2></article><article className="stat-card"><span>Pending requests</span><h2>{data.requests.filter((r) => r.status === "pending").length}</h2></article><article className="stat-card"><span>Upcoming classes</span><h2>{data.classes.filter((c) => new Date(c.startsAt) > new Date()).length}</h2></article></section>
      <section className="admin-section"><h2>Membership requests</h2><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Member</th><th>Plan</th><th>Price</th><th>Requested</th><th>Status</th><th>Actions</th></tr></thead><tbody>{data.requests.map((request) => <tr key={request._id}><td>{request.user?.name}<small>{request.user?.email}</small></td><td>{request.membership?.name}</td><td>₹{request.membership?.price}</td><td>{new Date(request.createdAt).toLocaleDateString()}</td><td><span className={`status-${request.status}`}>{request.status}</span></td><td>{request.status === "pending" && <div className="admin-actions"><button onClick={() => setRequestStatus(request._id, "approved")}>Approve</button><button onClick={() => setRequestStatus(request._id, "declined")}>Decline</button></div>}</td></tr>)}</tbody></table>{!data.requests.length && <p className="dashboard-muted">No membership requests yet.</p>}</div></section>
      <section className="admin-section"><h2>Manage trainers</h2><form className="admin-form" onSubmit={submitTrainer}><input placeholder="Name" aria-label="Trainer name" value={trainerForm.name} onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })} required /><input placeholder="Specialization" aria-label="Trainer specialization" value={trainerForm.specialization} onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })} required /><input type="number" min="0" placeholder="Years experience" aria-label="Years experience" value={trainerForm.experience} onChange={(e) => setTrainerForm({ ...trainerForm, experience: e.target.value })} required /><input placeholder="Photo URL (optional)" aria-label="Photo URL" value={trainerForm.image} onChange={(e) => setTrainerForm({ ...trainerForm, image: e.target.value })} /><input placeholder="Short bio (optional)" aria-label="Trainer bio" value={trainerForm.description} onChange={(e) => setTrainerForm({ ...trainerForm, description: e.target.value })} /><button className="btn-primary">{editing.trainer ? "Save trainer" : "Add trainer"}</button></form><div className="admin-item-list">{trainers.map((trainer) => <div key={trainer._id}><span><strong>{trainer.name}</strong><small>{trainer.specialization} · {trainer.experience} years</small></span><span className="admin-actions"><button onClick={() => { setTrainerForm({ name: trainer.name, specialization: trainer.specialization, experience: trainer.experience, image: trainer.image || "", description: trainer.description || "" }); setEditing({ ...editing, trainer: trainer._id }); }}>Edit</button><button className="text-button danger" onClick={() => remove(`/api/trainers/${trainer._id}`, "trainer")}>Delete</button></span></div>)}</div></section>
      <section className="admin-section"><h2>Manage membership plans</h2><form className="admin-form" onSubmit={submitPlan}><input placeholder="Plan name" aria-label="Plan name" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })} required /><input type="number" min="0" placeholder="Price in ₹" aria-label="Price in rupees" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })} required /><input placeholder="Duration (e.g. 1 month)" aria-label="Duration" value={planForm.duration} onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })} required /><input placeholder="Benefits, comma separated" aria-label="Plan benefits" value={planForm.features} onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })} /><button className="btn-primary">{editing.plan ? "Save plan" : "Add plan"}</button></form><div className="admin-item-list">{plans.map((plan) => <div key={plan._id}><span><strong>{plan.name}</strong><small>₹{plan.price} · {plan.duration}</small></span><span className="admin-actions"><button onClick={() => { setPlanForm({ name: plan.name, price: plan.price, duration: plan.duration, features: (plan.features || []).join(", ") }); setEditing({ ...editing, plan: plan._id }); }}>Edit</button><button className="text-button danger" onClick={() => remove(`/api/memberships/${plan._id}`, "plan")}>Delete</button></span></div>)}</div></section>
      <section className="admin-section"><h2>Manage classes</h2><form className="admin-form" onSubmit={submitClass}><input placeholder="Class name" aria-label="Class name" value={classForm.title} onChange={(e) => setClassForm({ ...classForm, title: e.target.value })} required /><input placeholder="Category" aria-label="Category" value={classForm.category} onChange={(e) => setClassForm({ ...classForm, category: e.target.value })} required /><input type="datetime-local" aria-label="Class start time" value={classForm.startsAt} onChange={(e) => setClassForm({ ...classForm, startsAt: e.target.value })} required /><select aria-label="Trainer" value={classForm.trainer} onChange={(e) => setClassForm({ ...classForm, trainer: e.target.value })}><option value="">FitZone Team</option>{trainers.map((trainer) => <option key={trainer._id} value={trainer._id}>{trainer.name}</option>)}</select><input type="number" min="15" aria-label="Duration in minutes" value={classForm.durationMinutes} onChange={(e) => setClassForm({ ...classForm, durationMinutes: e.target.value })} /><input type="number" min="1" aria-label="Capacity" value={classForm.capacity} onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })} /><input placeholder="Description" aria-label="Class description" value={classForm.description} onChange={(e) => setClassForm({ ...classForm, description: e.target.value })} /><button className="btn-primary">{editing.class ? "Save class" : "Add class"}</button></form><div className="admin-item-list">{data.classes.map((item) => <div key={item._id}><span><strong>{item.title}</strong><small>{new Date(item.startsAt).toLocaleString()} · {item.trainer?.name || "FitZone Team"}</small></span><span className="admin-actions"><button onClick={() => { setClassForm({ title: item.title, category: item.category, startsAt: localDateTime(item.startsAt), durationMinutes: item.durationMinutes, capacity: item.capacity, trainer: item.trainer?._id || "", description: item.description || "" }); setEditing({ ...editing, class: item._id }); }}>Edit</button><button className="text-button danger" onClick={() => remove(`/api/fitness/classes/${item._id}`, "class")}>Delete</button></span></div>)}</div></section>
      <section className="admin-section"><h2>Members</h2><div className="admin-item-list">{data.members.map((member) => <div key={member._id}><span><strong>{member.name}</strong><small>{member.email} · Joined {new Date(member.createdAt).toLocaleDateString()}</small></span></div>)}</div></section>
    </main>
  );
}

