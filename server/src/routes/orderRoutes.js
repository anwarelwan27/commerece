const express = require("express");
const { checkout } = require("../controllers/ordersController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, checkout);

module.exports = router;
