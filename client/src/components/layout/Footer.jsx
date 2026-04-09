import { NavLink } from "react-router-dom";
import { Cpu, Headphones, ShieldCheck, Truck } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell">
        <div className="surface-card grid gap-8 px-6 py-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <Cpu size={22} />
              </div>
              <div>
                <p className="font-display text-lg tracking-[0.18em]">TECHNOVA</p>
                <p className="text-sm text-[color:var(--text-muted)]">
                  Modern electronics for creators, students, and power users.
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
              TechNova Store combines clean product discovery, secure authentication, smart filtering, and a smooth
              checkout experience in one responsive full-stack project.
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
              <NavLink to="/products" className="hover:text-[color:var(--text-primary)]">
                Products
              </NavLink>
              <NavLink to="/cart" className="hover:text-[color:var(--text-primary)]">
                Cart
              </NavLink>
              <NavLink to="/checkout" className="hover:text-[color:var(--text-primary)]">
                Checkout
              </NavLink>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-cyan-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">
                Secure login flow with protected cart and checkout routes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="mt-1 text-emerald-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">
                Fast, responsive shopping flows with toasts, loaders, and empty states.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Headphones className="mt-1 text-cyan-300" size={18} />
              <p className="text-sm text-[color:var(--text-secondary)]">support@technovastore.dev</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
