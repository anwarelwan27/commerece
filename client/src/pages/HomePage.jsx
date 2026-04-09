import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productsApi, getApiErrorMessage } from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import HeroSection from "../components/home/HeroSection";
import CategoryStrip from "../components/home/CategoryStrip";
import FeaturePanel from "../components/home/FeaturePanel";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SectionHeading from "../components/common/SectionHeading";

function HomePage() {
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchTopProducts = async () => {
      setIsLoading(true);

      try {
        const { data } = await productsApi.getTopRated({ limit: 4 });
        setTopProducts(data.products);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to load top-rated products."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.info("Please log in before adding products to your cart.");
      navigate("/login", { state: { from: `/products/${product.id}` } });
      return;
    }

    setAddingProductId(product.id);

    try {
      const response = await addItem(product.id, 1);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <>
      <HeroSection featuredProduct={topProducts[0]} />
      <CategoryStrip />
      <FeaturePanel />

      <section className="section-shell pb-16">
        <SectionHeading
          eyebrow="Top Rated"
          title="High-performing devices customers keep coming back for."
          description="The homepage highlights the best-rated products in the database so shoppers can jump straight into trusted picks."
        />

        <div className="mt-8">
          {isLoading ? <LoadingSpinner label="Loading top-rated products..." /> : null}

          {!isLoading && errorMessage ? (
            <div className="surface-card px-6 py-10 text-center">
              <p className="text-lg font-semibold text-[color:var(--text-primary)]">{errorMessage}</p>
            </div>
          ) : null}

          {!isLoading && !errorMessage ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {topProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAdding={addingProductId === product.id}
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
