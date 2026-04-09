import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { gamesApi, getApiErrorMessage } from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import HeroSection from "../components/home/HeroSection";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturePanel from "../components/home/FeaturePanel";
import GameCard from "../components/games/GameCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SectionHeading from "../components/common/SectionHeading";

function HomePage() {
  const [topGames, setTopGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [addingGameId, setAddingGameId] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchTopGames = async () => {
      setIsLoading(true);

      try {
        const { data } = await gamesApi.getTopRated();
        setTopGames(data.games);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to load top-rated games."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopGames();
  }, []);

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
      <HeroSection featuredGame={topGames[0]} />
      <CategoryStrip />
      <FeaturePanel />

      <section className="section-shell pb-16">
        <SectionHeading
          eyebrow="Top Rated"
          title="Popular picks earning the strongest player reviews."
          description="The homepage highlights the highest-rated games in the database so shoppers can jump straight into trusted favorites."
        />

        <div className="mt-8">
          {isLoading ? <LoadingSpinner label="Loading top-rated games..." /> : null}

          {!isLoading && errorMessage ? (
            <div className="surface-card px-6 py-10 text-center">
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">{errorMessage}</p>
            </div>
          ) : null}

          {!isLoading && !errorMessage ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {topGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onAddToCart={handleAddToCart}
                  isAdding={addingGameId === game.id}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default HomePage;
