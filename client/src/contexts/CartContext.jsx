import { createContext, useContext, useEffect, useState } from "react";
import { cartApi, getApiErrorMessage, ordersApi } from "../api/apiClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const emptySummary = {
  subtotal: 0,
  itemCount: 0,
};

export function CartProvider({ children }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const refreshCart = async ({ silent = false } = {}) => {
    if (!user) {
      setItems([]);
      setSummary(emptySummary);
      return;
    }

    if (!silent) {
      setIsCartLoading(true);
    }

    try {
      const { data } = await cartApi.getCart(user.id);
      setItems(data.items);
      setSummary(data.summary);
    } catch (error) {
      if (error?.response?.status === 401) {
        logout();
      }

      throw new Error(getApiErrorMessage(error, "Unable to load the cart."));
    } finally {
      if (!silent) {
        setIsCartLoading(false);
      }
    }
  };

  useEffect(() => {
    const syncCart = async () => {
      if (!isAuthenticated || !user) {
        setItems([]);
        setSummary(emptySummary);
        return;
      }

      try {
        // Whenever the signed-in user changes, pull a fresh copy of their cart from the API.
        await refreshCart();
      } catch (error) {
        setItems([]);
        setSummary(emptySummary);
      }
    };

    syncCart();
  }, [isAuthenticated, user?.id]);

  const addItem = async (productId, quantity = 1) => {
    if (!user) {
      throw new Error("Please log in to add products to your cart.");
    }

    try {
      const { data } = await cartApi.add({ productId, quantity });
      await refreshCart({ silent: true });
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to add this product."));
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const { data } = await cartApi.update(itemId, { quantity });
      await refreshCart({ silent: true });
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to update the cart."));
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await cartApi.remove(itemId);
      await refreshCart({ silent: true });
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to remove the item."));
    }
  };

  const checkout = async () => {
    try {
      const { data } = await ordersApi.checkout();
      setItems([]);
      setSummary(emptySummary);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Checkout could not be completed."));
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        isCartLoading,
        refreshCart,
        addItem,
        updateItem,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
};
