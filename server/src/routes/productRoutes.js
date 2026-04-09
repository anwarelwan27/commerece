const express = require("express");
const {
  getProducts,
  getProductById,
  getTopRatedProducts,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/top-rated", getTopRatedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
