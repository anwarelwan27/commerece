import EmptyState from "../components/common/EmptyState";

function NotFoundPage() {
  return (
    <section className="section-shell pb-16">
      <EmptyState
        title="Page not found."
        description="The page you are looking for does not exist, but the games catalog is only one click away."
        actionLabel="Go to Games"
        actionTo="/games"
      />
    </section>
  );
}

export default NotFoundPage;
