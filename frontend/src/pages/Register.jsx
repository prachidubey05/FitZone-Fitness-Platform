// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   function handleChange(event) {
//     setForm({ ...form, [event.target.name]: event.target.value });
//     setMessage("");
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       setIsError(true);
//       setMessage("Passwords do not match.");
//       return;
//     }

//     setIsError(false);
//     setMessage("Account created successfully in demo mode!");
//   }

//   return (
//     <main className="register-page">
//       <section className="register-card">
//         <p className="eyebrow">Start Your Journey</p>
//         <h1>Create an <span>Account</span></h1>
//         <p className="register-description">
//           Join FitZone and work towards your fitness goals.
//         </p>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <label htmlFor="register-name">Full Name</label>
//           <input
//             id="register-name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />

//           <label htmlFor="register-email">Email Address</label>
//           <input
//             id="register-email"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             required
//           />

//           <label htmlFor="register-password">Password</label>
//           <input
//             id="register-password"
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="At least 6 characters"
//             minLength={6}
//             required
//           />

//           <label htmlFor="register-confirm">Confirm Password</label>
//           <input
//             id="register-confirm"
//             name="confirmPassword"
//             type="password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             placeholder="Re-enter password"
//             minLength={6}
//             required
//           />

//           {message && (
//             <p className={isError ? "form-error" : "form-success"}>
//               {message}
//             </p>
//           )}

//           <button className="btn-primary" type="submit">
//             Create Account
//           </button>
//         </form>

//         <p className="auth-switch">
//           Already registered? <Link to="/login">Login</Link>
//         </p>
//       </section>
//     </main>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setIsError(true);
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setIsError(false);
      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setIsError(true);
      setMessage(
        error.message === "Failed to fetch"
          ? "Backend connection failed. Check server URL and CORS."
          : error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <p className="eyebrow">Start Your Journey</p>
        <h1>
          Create an <span>Account</span>
        </h1>
        <p className="register-description">
          Join FitZone and work towards your fitness goals.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="register-confirm">Confirm Password</label>
          <input
            id="register-confirm"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          {message && (
            <p
              className={isError ? "form-error" : "form-success"}
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}