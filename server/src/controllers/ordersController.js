const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");

const checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartModel.getCartByUserId(userId);

    if (!cartItems.length) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    // The total is calculated from the live cart on the server so the client cannot spoof it.
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + Number(item.line_total),
      0
    );

    const order = await OrderModel.createOrder({
      userId,
      totalPrice: Number(totalPrice.toFixed(2)),
    });

    await CartModel.clearCartByUserId(userId);

    res.status(201).json({
      message: "Checkout completed successfully.",
      order,
      itemsPurchased: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
};
