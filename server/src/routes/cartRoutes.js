const express = require("express");
const {
  addToCart,
  getCartByUserId,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, addToCart);
router.get("/:userId", requireAuth, getCartByUserId);
router.put("/:id", requireAuth, updateCartItem);
router.delete("/:id", requireAuth, removeCartItem);

module.exports = router;
