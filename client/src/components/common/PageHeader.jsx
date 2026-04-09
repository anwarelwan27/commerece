function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="section-shell mb-10">
      <div className="surface-card overflow-hidden px-6 py-10 sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.35em] text-[color:var(--text-muted)]">
            {eyebrow}
          </p>
          <h1 className="headline-gradient text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
