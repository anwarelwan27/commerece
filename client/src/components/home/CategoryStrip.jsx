import {
  Headphones,
  Keyboard,
  Laptop,
  Mouse,
  Smartphone,
  Sparkles,
} from "lucide-react";

const categories = [
  { title: "Laptops", icon: Laptop, accent: "text-cyan-300" },
  { title: "Mobile Phones", icon: Smartphone, accent: "text-emerald-300" },
  { title: "Headphones", icon: Headphones, accent: "text-amber-300" },
  { title: "Keyboards", icon: Keyboard, accent: "text-cyan-300" },
  { title: "Mice", icon: Mouse, accent: "text-lime-300" },
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
                Explore high-performance essentials for your setup.
              </p>
            </div>
          );
        })}

        <div className="surface-card flex items-center gap-4 p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[color:var(--text-primary)]">Curated Picks</p>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Clean catalog, strong ratings, and smart filters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;
