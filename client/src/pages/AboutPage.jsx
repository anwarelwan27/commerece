import { Cpu, Database, LayoutDashboard, ServerCog } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import { TEAM_VALUES } from "../utils/constants";

const stackCards = [
  {
    title: "React Frontend",
    description: "Functional components, React Router, Axios, context state, and responsive Tailwind styling.",
    icon: LayoutDashboard,
  },
  {
    title: "Express Backend",
    description: "REST APIs for authentication, catalog browsing, cart actions, and checkout handling.",
    icon: ServerCog,
  },
  {
    title: "MySQL Database",
    description: "Structured tables for users, games, cart items, and order history with sample seed data.",
    icon: Database,
  },
  {
    title: "Full-Stack Thinking",
    description: "A complete project that is clean enough to study, present, and continue improving later.",
    icon: Cpu,
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ClickMart"
        title="A gaming-style e-commerce project built to feel professional and presentation-ready."
        description="ClickMart was designed as a complete final project that demonstrates frontend development, backend APIs, database integration, and polished UX in one cohesive application."
      />

      <section className="section-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Project Goals</p>
            <div className="mt-6 space-y-4">
              {TEAM_VALUES.map((value) => (
                <div key={value} className="surface-muted p-4 text-[color:var(--text-secondary)]">
                  {value}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {stackCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="surface-card flex gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">{card.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
