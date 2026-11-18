import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="contact-page">
      <section className="page-banner">
        <p className="eyebrow">We Are Here To Help</p>
        <h1>Contact <span>Us</span></h1>
        <p>Have a question about membership or our facilities?</p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <p className="eyebrow">Get In Touch</p>
          <h2>Let's Talk Fitness</h2>
          <p>Send us your questions and our team will be happy to help.</p>

          <div className="contact-detail">
            <h3>📍 Address</h3>
            <p>FitZone Gym, Your City, India</p>
          </div>

          <div className="contact-detail">
            <h3>✉️ Email</h3>
            <p>info@fitzone.example</p>
          </div>

          <div className="contact-detail">
            <h3>🕒 Opening Hours</h3>
            <p>Monday – Saturday: 6 AM – 9 PM</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Full Name</label>
          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="5"
            required
          />

          <button className="btn-primary" type="submit">Send Enquiry</button>

          {submitted && (
            <p className="success-message">
              Thank you! Your message has been submitted.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
