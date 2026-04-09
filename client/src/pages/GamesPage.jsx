import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { gamesApi, getApiErrorMessage } from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import PageHeader from "../components/common/PageHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import GameFilters from "../components/games/GameFilters";
import GameCard from "../components/games/GameCard";

const initialFilters = {
  search: "",
  category: "All",
  minPrice: "",
  maxPrice: "",
  sort: "rating",
};

function GamesPage() {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [addingGameId, setAddingGameId] = useState(null);
  // This keeps the UI responsive while search input updates in real time.
  const deferredSearch = useDeferredValue(filters.search);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);

      try {
        const { data } = await gamesApi.getAll({
          search: deferredSearch,
          category: filters.category === "All" ? "" : filters.category,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort,
        });

        setGames(data.games);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to fetch games."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [deferredSearch, filters.category, filters.maxPrice, filters.minPrice, filters.sort]);

  const handleFilterChange = (field, value) => {
    if (field === "search") {
      startTransition(() => {
        setFilters((currentFilters) => ({
          ...currentFilters,
          [field]: value,
        }));
      });
      return;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleAddToCart = async (game) => {
    if (!isAuthenticated) {
      toast.info("Please log in before adding games to your cart.");
      navigate("/login", { state: { from: `/games/${game.id}` } });
      return;
    }

    setAddingGameId(game.id);

    try {
      const response = await addItem(game.id, 1);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddingGameId(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Games Catalog"
        title="Search faster, filter smarter, and discover your next download."
        description="Use the real-time search, category filter, price range controls, and sort options to quickly browse the full catalog."
      />

      <section className="section-shell pb-16">
        <GameFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          resultsCount={games.length}
        />

        {isLoading ? <LoadingSpinner label="Loading games catalog..." /> : null}

        {!isLoading && errorMessage ? (
          <div className="surface-card px-6 py-10 text-center">
            <p className="text-lg font-semibold text-[color:var(--text-primary)]">{errorMessage}</p>
          </div>
        ) : null}

        {!isLoading && !errorMessage && games.length === 0 ? (
          <EmptyState
            title="No games matched these filters."
            description="Try a different title, widen the price range, or switch categories to explore more results."
            actionLabel="Reset and Explore"
            actionTo="/games"
          />
        ) : null}

        {!isLoading && !errorMessage && games.length > 0 ? (
          <div className="space-y-4">
            {isPending ? (
              <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                Updating results...
              </p>
            ) : null}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onAddToCart={handleAddToCart}
                  isAdding={addingGameId === game.id}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default GamesPage;
