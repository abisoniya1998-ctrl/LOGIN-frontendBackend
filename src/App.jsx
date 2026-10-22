import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const SESSION_KEY = "abisoniya-user";

function SchoolLogo() {
  return (
    <a className="school-logo" href="/" aria-label="Abisoniya Institute home">
      <span className="logo-mark">A</span>
      <span>
        <strong>ABISONIYA</strong>
        <small>INSTITUTE</small>
      </span>
    </a>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/dashboard");
    } catch {
      setError("The server could not be reached. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-side">
        <header className="page-header">
          <SchoolLogo />
          <a className="help-link" href="mailto:hello@abisoniya.example">
            Need help?
          </a>
        </header>

        <div className="login-content">
          <p className="small-heading">WELCOME BACK</p>
          <h1>Learning starts<br />with showing up.</h1>
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
        </div>

        <footer className="page-footer">
          © 2026 Abisoniya Institute
        </footer>
      </section>

      <aside className="welcome-side">
        <div className="welcome-top">
          <span>CURIOUS MINDS. BRIGHT FUTURES.</span>
          <span className="welcome-number">01 / 01</span>
        </div>

        <div className="book-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-book book-back" />
          <div className="art-book book-front">
            <span>A</span>
          </div>
          <div className="art-star star-left">✦</div>
          <div className="art-star star-right">✳</div>
        </div>

        <div className="welcome-message">
          <p className="small-heading">YOUR FUTURE IS YOURS TO SHAPE</p>
          <h2>Big ideas begin<br />with a first step.</h2>
          <p>
            Discover your potential, build new skills, and make your next
            chapter count.
          </p>
        </div>
        <p className="welcome-caption">Learn something wonderful.</p>
      </aside>
    </main>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem(SESSION_KEY);

  if (!email) {
    return <Navigate to="/" replace />;
  }

  function handleSignOut() {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/");
  }

  return (
    <main className="dashboard-page">
      <header className="page-header">
        <SchoolLogo />
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <section className="dashboard-content">
        <p className="small-heading">STUDENT DASHBOARD</p>
        <h1>Welcome to your<br />next chapter.</h1>
        <p className="dashboard-intro">
          You are signed in as <strong>{email}</strong>.
        </p>
        <div className="dashboard-card">
          <span className="card-icon">✦</span>
          <div>
            <h2>Keep your curiosity going</h2>
            <p>Every new thing you learn is a step toward your goals.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
