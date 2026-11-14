// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     setError("Demo mode: Backend authentication is not connected yet.");
//   }

//   return (
//     <main className="auth-page">
//       <section className="auth-card">
//         <p className="eyebrow">Welcome Back</p>
//         <h1>Login to <span>FitZone</span></h1>
//         <p className="auth-description">Continue your fitness journey.</p>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <label htmlFor="login-email">Email Address</label>
//           <input
//             id="login-email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             required
//           />

//           <label htmlFor="login-password">Password</label>
//           <input
//             id="login-password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//             minLength={6}
//           />

//           {error && <p className="form-error">{error}</p>}

//           <button className="btn-primary" type="submit">Login</button>
//         </form>

//         <p className="auth-switch">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </section>
//     </main>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token) {
        throw new Error(
          "Login response mein authentication token nahi mila."
        );
      }

      // Store token for subsequent authenticated requests.
      localStorage.setItem("token", data.token);

      // Adjust this path to your app's dashboard/home route.
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Backend se connection nahi ho raha. Server URL aur CORS check karo."
          : err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Welcome Back</p>
        <h1>
          Login to <span>FitZone</span>
        </h1>
        <p className="auth-description">
          Continue your fitness journey.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            minLength={8}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}