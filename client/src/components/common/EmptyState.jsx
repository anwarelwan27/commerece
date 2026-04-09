import { Link } from "react-router-dom";

function EmptyState({ title, description, actionLabel, actionTo = "/games" }) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="rounded-full bg-sky-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
        Nothing here yet
      </div>
      <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">{title}</h2>
      <p className="max-w-xl text-[color:var(--text-secondary)]">{description}</p>
      {actionLabel ? (
        <Link to={actionTo} className="primary-button">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
