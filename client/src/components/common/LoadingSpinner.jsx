function LoadingSpinner({ label = "Loading content...", compact = false }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 ${
        compact ? "py-8" : "py-20"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-14 w-14 rounded-full border-4 border-cyan-400/20" />
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-emerald-400" />
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}

export default LoadingSpinner;
