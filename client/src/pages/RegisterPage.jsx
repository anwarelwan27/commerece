import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

function RegisterPage() {
  const { register, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register(formData);
      toast.success("Account created successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="section-shell pb-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card px-6 py-10 sm:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Create Account</p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text-primary)]">
            Join ClickMart and start building your library.
          </h1>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-secondary)]">
            Registration stores your user in MySQL, returns a JWT token, and signs you in immediately.
          </p>
        </div>

        <form className="surface-card p-6 sm:p-8" onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Full Name</label>
          <input
            type="text"
            className="field"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-[color:var(--text-secondary)]">Email Address</label>
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
            {isAuthLoading ? "Creating Account..." : "Register"}
          </button>

          <p className="mt-5 text-sm text-[color:var(--text-secondary)]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-sky-300 hover:text-sky-200">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
