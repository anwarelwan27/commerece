import {
  CarFront,
  Compass,
  Crosshair,
  Drama,
  Ghost,
  Sparkles,
  Swords,
} from "lucide-react";

const categories = [
  { title: "Action", icon: Swords, accent: "text-sky-300" },
  { title: "Shooter", icon: Crosshair, accent: "text-orange-300" },
  { title: "RPG", icon: Drama, accent: "text-violet-300" },
  { title: "Adventure", icon: Compass, accent: "text-emerald-300" },
  { title: "Stealth", icon: Ghost, accent: "text-lime-300" },
  { title: "Racing", icon: CarFront, accent: "text-cyan-300" },
];

function CategoryStrip() {
  return (
    <section className="section-shell pb-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div key={category.title} className="surface-card p-5">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${category.accent}`}>
                <Icon size={22} />
              </div>
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">{category.title}</p>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                Explore carefully picked releases and hidden gems.
              </p>
            </div>
          );
        })}

        <div className="surface-card flex items-center gap-4 p-5 sm:col-span-2 xl:col-span-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[color:var(--text-primary)]">Curated Collection</p>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Every listing is styled, searchable, and ready for checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;
