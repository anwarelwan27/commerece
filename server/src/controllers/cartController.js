const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

const buildCartSummary = (items) => {
  const subtotal = items.reduce((sum, item) => sum + Number(item.line_total), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    itemCount,
  };
};

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity || 1);

    if (!productId || Number.isNaN(productId)) {
      return res.status(400).json({ message: "A valid product ID is required." });
    }

    if (!quantity || Number.isNaN(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1." });
    }

    const selectedProduct = await ProductModel.getProductById(productId);

    if (!selectedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    const item = await CartModel.addToCart({ userId, productId, quantity });
    const cartItems = await CartModel.getCartByUserId(userId);

    res.status(201).json({
      message: `${selectedProduct.title} added to cart.`,
      item,
      summary: buildCartSummary(cartItems),
    });
  } catch (error) {
    next(error);
  }
};

const getCartByUserId = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "You can only view your own cart." });
    }

    const items = await CartModel.getCartByUserId(userId);

    res.json({
      items,
      summary: buildCartSummary(items),
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const quantity = Number(req.body.quantity);

    if (!quantity || Number.isNaN(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1." });
    }

    const updatedItem = await CartModel.updateCartItemQuantity({
      id,
      userId: req.user.id,
      quantity,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    const cartItems = await CartModel.getCartByUserId(req.user.id);

    res.json({
      message: "Cart updated successfully.",
      item: updatedItem,
      summary: buildCartSummary(cartItems),
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const wasDeleted = await CartModel.deleteCartItem({
      id,
      userId: req.user.id,
    });

    if (!wasDeleted) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    const cartItems = await CartModel.getCartByUserId(req.user.id);

    res.json({
      message: "Item removed from cart.",
      summary: buildCartSummary(cartItems),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeCartItem,
};
