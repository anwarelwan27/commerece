function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-[color:var(--text-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="headline-gradient text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[color:var(--text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
