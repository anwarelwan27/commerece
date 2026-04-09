import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { buildImageUrl, formatCurrency } from "../../utils/helpers";

function HeroSection({ featuredGame }) {
  return (
    <section className="section-shell pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_28%)]" />
          <div className="relative">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Click. Collect. Conquer.
            </div>
            <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl xl:text-6xl">
              Your next <span className="text-sky-300">favorite game</span> starts here.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--text-secondary)]">
              ClickMart is a modern digital games store built for smooth discovery, fast checkout, and a bold gamer-first
              experience across mobile, tablet, and desktop.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/games" className="primary-button">
                Browse Games
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="secondary-button">
                Learn More
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="surface-muted p-4">
                <ShieldCheck className="mb-3 text-sky-300" size={20} />
                <p className="text-lg font-semibold">Secure Auth</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Protected user cart and checkout flow.
                </p>
              </div>
              <div className="surface-muted p-4">
                <Sparkles className="mb-3 text-orange-300" size={20} />
                <p className="text-lg font-semibold">Gaming UI</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Smooth visuals with dark and light themes.
                </p>
              </div>
              <div className="surface-muted p-4">
                <Trophy className="mb-3 text-sky-300" size={20} />
                <p className="text-lg font-semibold">Top Rated Picks</p>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  Highlights curated from the best scores.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card overflow-hidden p-4 sm:p-5">
          <div className="surface-muted overflow-hidden p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Featured Drop</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                  {featuredGame?.title || "Cyber Rift"}
                </p>
              </div>
              <div className="rounded-full bg-sky-400/15 px-3 py-2 text-sm font-semibold text-sky-300">
                {formatCurrency(featuredGame?.price || 59.99)}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src={buildImageUrl(featuredGame?.image || "/images/games/cyber-rift.svg")}
                alt={featuredGame?.title || "Cyber Rift"}
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              {featuredGame?.description ||
                "A premium showcase title with a bold sci-fi atmosphere, fast action, and clean cover art served from the local backend."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
