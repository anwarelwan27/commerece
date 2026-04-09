import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import PageHeader from "../components/common/PageHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import { buildImageUrl, formatCurrency } from "../utils/helpers";

function CartPage() {
  const { items, summary, isCartLoading, updateItem, removeItem } = useCart();
  const [activeItemId, setActiveItemId] = useState(null);

  const totalPrice = summary.subtotal;

  const handleUpdateQuantity = async (item, quantity) => {
    if (quantity < 1) {
      return;
    }

    setActiveItemId(item.id);

    try {
      await updateItem(item.id, quantity);
      toast.success("Cart updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActiveItemId(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setActiveItemId(itemId);

    try {
      await removeItem(itemId);
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActiveItemId(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Your Cart"
        title="Review your devices, adjust quantities, and move smoothly to checkout."
        description="The TechNova cart updates in real time with editable quantities, instant totals, and clear action feedback."
      />

      <section className="section-shell pb-16">
        {isCartLoading ? <LoadingSpinner label="Loading your cart..." /> : null}

        {!isCartLoading && items.length === 0 ? (
          <EmptyState
            title="Your cart is empty."
            description="Start browsing the catalog and add a few products to continue to checkout."
            actionLabel="Browse Products"
            actionTo="/products"
          />
        ) : null}

        {!isCartLoading && items.length > 0 ? (
          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="surface-card grid gap-5 overflow-hidden p-4 sm:grid-cols-[180px_1fr]"
                >
                  <img
                    src={buildImageUrl(item.image)}
                    alt={item.title}
                    className="h-full min-h-48 w-full rounded-[1.5rem] object-cover"
                  />

                  <div className="flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                            {item.category}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                            {item.title}
                          </h2>
                        </div>
                        <p className="text-2xl font-semibold text-[color:var(--text-primary)]">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                          className="secondary-button !h-10 !w-10 !rounded-full !px-0 !py-0"
                          disabled={activeItemId === item.id}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-12 text-center text-lg font-semibold text-[color:var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          className="secondary-button !h-10 !w-10 !rounded-full !px-0 !py-0"
                          disabled={activeItemId === item.id}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-[color:var(--text-primary)]">
                          Total: {formatCurrency(item.line_total)}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="secondary-button"
                          disabled={activeItemId === item.id}
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="surface-card h-fit p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Order Summary</p>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text-primary)]">
                Ready to checkout
              </h2>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
                  <span>Products in cart</span>
                  <span>{summary.itemCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
                  <span>Service fee</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                      Total
                    </span>
                    <span className="text-3xl font-semibold text-[color:var(--text-primary)]">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link to="/checkout" className="primary-button w-full justify-center">
                  Continue to Checkout
                </Link>
                <Link to="/products" className="secondary-button w-full justify-center">
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default CartPage;
