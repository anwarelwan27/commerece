import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productsApi, getApiErrorMessage } from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import PageHeader from "../components/common/PageHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";

const initialFilters = {
  search: "",
  category: "All",
  minPrice: "",
  maxPrice: "",
  sort: "rating",
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);
  const deferredSearch = useDeferredValue(filters.search);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const { data } = await productsApi.getAll({
          search: deferredSearch,
          category: filters.category === "All" ? "" : filters.category,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort,
        });

        setProducts(data.products);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to fetch products."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
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
      <PageHeader
        eyebrow="Products Catalog"
        title="Search smarter, filter faster, and compare modern tech gear in one place."
        description="Browse TechNova's electronics lineup with live search, category filtering, price range controls, and top-rated sorting."
      />

      <section className="section-shell pb-16">
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          resultsCount={products.length}
        />

        {isLoading ? <LoadingSpinner label="Loading products catalog..." /> : null}

        {!isLoading && errorMessage ? (
          <div className="surface-card px-6 py-10 text-center">
            <p className="text-lg font-semibold text-[color:var(--text-primary)]">{errorMessage}</p>
          </div>
        ) : null}

        {!isLoading && !errorMessage && products.length === 0 ? (
          <EmptyState
            title="No products matched these filters."
            description="Try another search term, widen the price range, or switch categories to explore more items."
            actionLabel="Reset and Explore"
            actionTo="/products"
          />
        ) : null}

        {!isLoading && !errorMessage && products.length > 0 ? (
          <div className="space-y-4">
            {isPending ? (
              <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                Updating results...
              </p>
            ) : null}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAdding={addingProductId === product.id}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default ProductsPage;
