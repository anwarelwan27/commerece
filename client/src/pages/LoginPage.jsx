import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "demo@clickmart.com",
    password: "password123",
  });

  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(formData);
      toast.success("Welcome back to ClickMart.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="section-shell pb-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card px-6 py-10 sm:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Welcome Back</p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text-primary)]">Log in to continue.</h1>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-secondary)]">
            Use the seeded demo account below or sign in with any user you created through registration.
          </p>

          <div className="surface-muted mt-8 space-y-2 p-5 text-sm text-[color:var(--text-secondary)]">
            <p>
              <strong>Demo email:</strong> demo@clickmart.com
            </p>
            <p>
              <strong>Password:</strong> password123
            </p>
          </div>
        </div>

        <form className="surface-card p-6 sm:p-8" onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Email Address</label>
          <input
            type="email"
            className="field"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-[color:var(--text-secondary)]">Password</label>
          <input
            type="password"
            className="field"
            value={formData.password}
            onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
          />

          <button type="submit" className="primary-button mt-8" disabled={isAuthLoading}>
            {isAuthLoading ? "Logging In..." : "Login"}
          </button>

          <p className="mt-5 text-sm text-[color:var(--text-secondary)]">
            New to ClickMart?{" "}
            <Link to="/register" className="font-semibold text-sky-300 hover:text-sky-200">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
