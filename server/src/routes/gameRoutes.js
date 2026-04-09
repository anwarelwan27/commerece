const express = require("express");
const {
  getGames,
  getGameById,
  getTopRatedGames,
} = require("../controllers/gamesController");

const router = express.Router();

router.get("/top-rated", getTopRatedGames);
router.get("/", getGames);
router.get("/:id", getGameById);

module.exports = router;
