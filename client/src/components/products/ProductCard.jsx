import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { buildImageUrl, formatCurrency } from "../../utils/helpers";

function ProductCard({ product, onAddToCart, isAdding = false }) {
  return (
    <article className="surface-card group overflow-hidden transition duration-300 hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.18))]" />
          <img
            src={buildImageUrl(product.image)}
            alt={product.title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
              {product.category}
            </p>
            <Link
              to={`/products/${product.id}`}
              className="text-xl font-semibold text-[color:var(--text-primary)] transition hover:text-cyan-300"
            >
              {product.title}
            </Link>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-sm text-amber-300">
            <Star size={14} fill="currentColor" />
            {Number(product.rating).toFixed(1)}
          </div>
        </div>

        <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-[color:var(--text-secondary)]">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-semibold text-[color:var(--text-primary)]">
            {formatCurrency(product.price)}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={isAdding}
            className="primary-button !px-4 !py-2.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ShoppingCart size={16} />
            {isAdding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
