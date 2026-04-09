import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { toast } from "react-toastify";
import { productsApi, getApiErrorMessage } from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import { buildImageUrl, formatCurrency, formatRating } from "../utils/helpers";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      try {
        const { data } = await productsApi.getById(id);
        setProduct(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to load product details."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) {
      return;
    }

    if (!isAuthenticated) {
      toast.info("Please log in before adding products to your cart.");
      navigate("/login", { state: { from: `/products/${product.id}` } });
      return;
    }

    setIsAdding(true);

    try {
      const response = await addItem(product.id, quantity);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading product details..." />;
  }

  if (errorMessage || !product) {
    return (
      <section className="section-shell pb-16">
        <EmptyState
          title="Product not found."
          description={errorMessage || "The requested product does not exist in the database."}
          actionLabel="Back to Catalog"
          actionTo="/products"
        />
      </section>
    );
  }

  return (
    <section className="section-shell pb-16">
      <div className="mb-6 text-sm text-[color:var(--text-muted)]">
        <Link to="/products" className="hover:text-[color:var(--text-primary)]">
          Products
        </Link>{" "}
        / {product.title}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card overflow-hidden p-4">
          <img
            src={buildImageUrl(product.image)}
            alt={product.title}
            className="h-full max-h-[720px] w-full rounded-[2rem] object-cover"
          />
        </div>

        <div className="surface-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {product.category}
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-amber-300">
              <Star size={16} fill="currentColor" />
              {formatRating(product.rating)}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold text-[color:var(--text-primary)]">{product.title}</h1>
          <p className="mt-5 text-base leading-8 text-[color:var(--text-secondary)]">{product.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="surface-muted p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Shipping</p>
              <p className="mt-2 font-semibold text-[color:var(--text-primary)]">Fast local delivery</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Warranty</p>
              <p className="mt-2 font-semibold text-[color:var(--text-primary)]">Official 1-year support</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Store Care</p>
              <p className="mt-2 font-semibold text-[color:var(--text-primary)]">Technical help included</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Price</p>
              <p className="mt-2 text-4xl font-semibold text-[color:var(--text-primary)]">
                {formatCurrency(product.price)}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-[color:var(--text-secondary)]">
                <Truck size={15} className="text-emerald-300" />
                Ships in 1-2 business days
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2">
                <button
                  type="button"
                  className="secondary-button !h-10 !w-10 !rounded-full !px-0 !py-0"
                  onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-10 text-center text-lg font-semibold text-[color:var(--text-primary)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="secondary-button !h-10 !w-10 !rounded-full !px-0 !py-0"
                  onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart size={16} />
                {isAdding ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
