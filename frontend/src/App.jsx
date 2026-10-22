import { useState } from "react";
import "./App.css";

const SESSION_KEY = "abisoniya-user";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedInEmail, setSignedInEmail] = useState(
    sessionStorage.getItem(SESSION_KEY) || "",
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "We couldn't sign you in. Please try again.");
        return;
      }

      sessionStorage.setItem(SESSION_KEY, result.user.email);
      setSignedInEmail(result.user.email);
    } catch {
      setError("The server could not be reached. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setSignedInEmail("");
    setPassword("");
  }

  return (
    <main className="page">
      <section className="login-panel">
        <header className="header">
          <a className="brand" href="/" aria-label="Abisoniya Institute home">
            <span className="brand-mark">A</span>
            <span>
              <strong>ABISONIYA</strong>
              <small>INSTITUTE</small>
            </span>
          </a>
          <a className="help-link" href="mailto:hello@abisoniya.example">
            Need help?
          </a>
        </header>

        {signedInEmail ? (
          <section className="content">
            <p className="eyebrow">STUDENT DASHBOARD</p>
            <h1>Welcome to your next chapter.</h1>
            <p className="intro">
              You are signed in as <strong>{signedInEmail}</strong>.
            </p>
            <div className="dashboard-card">
              <span className="card-icon">✦</span>
              <div>
                <h2>Keep your curiosity going</h2>
                <p>Every new thing you learn is a step toward your goals.</p>
              </div>
            </div>
            <button className="sign-out" onClick={handleSignOut} type="button">
              Sign out
            </button>
          </section>
        ) : (
          <>
            <section className="content">
              <p className="eyebrow">WELCOME BACK</p>
              <h1>Learning starts with showing up.</h1>
              <p className="intro">
                Sign in to continue your learning journey with us.
              </p>

              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {error && <p className="error-message" role="alert">{error}</p>}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && <span aria-hidden="true">→</span>}
                </button>
              </form>

              <p className="demo-account">
                Demo account: <strong>demo@abisoniya.test</strong>
                <br />
                Password: <strong>Abisoniya2026!</strong>
              </p>
            </section>
            <footer className="footer">© 2026 Abisoniya Institute</footer>
          </>
        )}
      </section>

      <aside className="welcome-panel">
        <div className="welcome-heading">
          <p className="welcome-label">CURIOUS MINDS. BRIGHT FUTURES.</p>
          <span className="course-badge">FULL-STACK DEVELOPMENT</span>
        </div>
        <div className="student-gallery" aria-label="Students learning together">
          <img
            className="student-photo photo-one"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85"
            alt="College students smiling together on campus"
          />
          <img
            className="student-photo photo-two"
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=600&q=85"
            alt="Students working together on a project"
          />
          <img
            className="student-photo photo-three"
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=85"
            alt="Students learning in a classroom"
          />
        </div>
        <div className="welcome-copy">
          <p className="eyebrow">LEARN BY BUILDING REAL PROJECTS</p>
          <h2>Learn full stack.<br />Build your future.</h2>
          <p>
            Learn frontend and backend development, from your first webpage to
            a complete working app.
          </p>
        </div>
        <blockquote className="motivation-quote">
          “Start where you are. Learn what you can. Build what you dream.”
        </blockquote>
        <p className="welcome-footer">Your next chapter starts here.</p>
      </aside>
    </main>
  );
}

export default App;
