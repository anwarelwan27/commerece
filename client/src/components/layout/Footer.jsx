import { NavLink } from "react-router-dom";
import { Gamepad2, Mail, ShieldCheck, Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell">
        <div className="surface-card grid gap-8 px-6 py-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-300">
                <Gamepad2 size={22} />
              </div>
              <div>
                <p className="font-display text-lg tracking-[0.18em]">CLICKMART</p>
                <p className="text-sm text-[color:var(--text-muted)]">
                  A polished digital marketplace built for modern players.
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
              Browse curated games, compare prices, discover top-rated titles, and enjoy a responsive shopping
              experience designed with a clean gamer-first visual style.
            </p>
          </div>

          <div>
            <p className="mb-4 font-display text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
              Explore
            </p>
            <div className="flex flex-col gap-3 text-sm text-[color:var(--text-secondary)]">
              <NavLink to="/" className="hover:text-[color:var(--text-primary)]">
                Home
              </NavLink>
              <NavLink to="/games" className="hover:text-[color:var(--text-primary)]">
                Games
              </NavLink>
              <NavLink to="/about" className="hover:text-[color:var(--text-primary)]">
                About
              </NavLink>
              <NavLink to="/contact" className="hover:text-[color:var(--text-primary)]">
                Contact
              </NavLink>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-sky-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">
                Secure login flow with protected cart and checkout routes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 text-orange-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">
                Smooth visual transitions, toasts, and user-friendly empty states.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 text-sky-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">support@clickmart.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
