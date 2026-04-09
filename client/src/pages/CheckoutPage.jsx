import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { formatCurrency } from "../utils/helpers";

function CheckoutPage() {
  const { user } = useAuth();
  const { items, summary, checkout } = useCart();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    country: "Egypt",
    city: "Cairo",
    address: "",
    paymentMethod: "Cash on Delivery",
    deliveryOption: "Standard Shipping",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    const hasEmptyField = Object.values(formData).some((value) => !String(value).trim());

    if (hasEmptyField) {
      toast.error("Please complete all checkout fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await checkout();
      setCompletedOrder(data);
      toast.success("Order placed successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!items.length && !completedOrder) {
    return (
      <section className="section-shell pb-16">
        <EmptyState
          title="No items available for checkout."
          description="Add products to your cart first, then return here to place your order."
          actionLabel="Browse Products"
          actionTo="/products"
        />
      </section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Complete your order and send your setup to the finish line."
        description="This checkout form collects customer delivery details and submits a real order to the backend using the cart data stored in MySQL."
      />

      <section className="section-shell pb-16">
        {completedOrder ? (
          <div className="surface-card max-w-3xl px-6 py-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
              <CheckCircle2 size={28} />
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Order Confirmed</p>
            <h2 className="mt-3 text-4xl font-semibold text-[color:var(--text-primary)]">
              Thanks, {formData.fullName.split(" ")[0]}.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--text-secondary)]">
              Your purchase has been recorded successfully. In a real store, a confirmation would be sent to
              {" "}{formData.email} with delivery tracking details.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-muted p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Order ID</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                  #{completedOrder.order.id}
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Total Paid</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                  {formatCurrency(completedOrder.order.total_price)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
            <form className="surface-card p-6 sm:p-8" onSubmit={handleCheckout}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="field"
                    value={formData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="field"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Country
                  </label>
                  <input
                    type="text"
                    className="field"
                    value={formData.country}
                    onChange={(event) => handleChange("country", event.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    City
                  </label>
                  <input
                    type="text"
                    className="field"
                    value={formData.city}
                    onChange={(event) => handleChange("city", event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Address
                  </label>
                  <textarea
                    rows="4"
                    className="field resize-none"
                    value={formData.address}
                    onChange={(event) => handleChange("address", event.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Delivery Option
                  </label>
                  <select
                    className="field"
                    value={formData.deliveryOption}
                    onChange={(event) => handleChange("deliveryOption", event.target.value)}
                  >
                    <option>Standard Shipping</option>
                    <option>Express Shipping</option>
                    <option>Store Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">
                    Payment Method
                  </label>
                  <select
                    className="field"
                    value={formData.paymentMethod}
                    onChange={(event) => handleChange("paymentMethod", event.target.value)}
                  >
                    <option>Cash on Delivery</option>
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="primary-button mt-8">
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            <aside className="surface-card h-fit p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Checkout Summary</p>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="surface-muted flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="font-semibold text-[color:var(--text-primary)]">{item.title}</p>
                      <p className="text-sm text-[color:var(--text-secondary)]">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[color:var(--text-primary)]">
                      {formatCurrency(item.line_total)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-sm text-[color:var(--text-secondary)]">
                  <span>Items</span>
                  <span>{summary.itemCount}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-2xl font-semibold text-[color:var(--text-primary)]">
                  <span>Total</span>
                  <span>{formatCurrency(summary.subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

export default CheckoutPage;
