import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { STORE_METRICS } from "../../utils/constants";
import { buildImageUrl, formatCurrency } from "../../utils/helpers";

function HeroSection({ featuredProduct }) {
  return (
    <section className="section-shell pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_28%)]" />
          <div className="relative">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Build your setup better
            </div>
            <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl xl:text-6xl">
              Modern tech gear for <span className="text-cyan-300">work, play, and creativity.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--text-secondary)]">
              TechNova Store is a full-stack electronics marketplace with smart product discovery, secure shopping, and
              a bold interface designed for a final-year web development project.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="primary-button">
                Shop Products
                <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="secondary-button">
                Create Account
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="surface-muted p-4">
                <ShieldCheck className="mb-3 text-cyan-300" size={20} />
                <p className="text-lg font-semibold">Secure Login</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Protected cart and checkout routes with JWT auth.
                </p>
              </div>
              <div className="surface-muted p-4">
                <Sparkles className="mb-3 text-amber-300" size={20} />
                <p className="text-lg font-semibold">Clean UI</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Tech-focused visuals with light and dark mode support.
                </p>
              </div>
              <div className="surface-muted p-4">
                <Truck className="mb-3 text-emerald-300" size={20} />
                <p className="text-lg font-semibold">Fast Checkout</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Smooth cart updates, toasts, and order confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card overflow-hidden p-4 sm:p-5">
          <div className="surface-muted overflow-hidden p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Featured Device</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                  {featuredProduct?.title || "NovaBook Pro 14"}
                </p>
              </div>
              <div className="rounded-full bg-cyan-400/15 px-3 py-2 text-sm font-semibold text-cyan-300">
                {formatCurrency(featuredProduct?.price || 1299)}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src={buildImageUrl(featuredProduct?.image || "/images/products/laptop.svg")}
                alt={featuredProduct?.title || "NovaBook Pro 14"}
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              {featuredProduct?.description ||
                "A premium laptop made for creators and focused workflows, showcased with a clean editorial layout and responsive frontend design."}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {STORE_METRICS.map((metric) => (
                <div key={metric.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">{metric.title}</p>
                  <p className="mt-2 text-lg font-semibold text-[color:var(--text-primary)]">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
