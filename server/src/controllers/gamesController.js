const GameModel = require("../models/gameModel");

const getGames = async (req, res, next) => {
  try {
    const search = req.query.search?.trim() || "";
    const category = req.query.category?.trim() || "";
    const minPrice =
      req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
    const maxPrice =
      req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    const sort = req.query.sort?.trim() || "rating";

    const games = await GameModel.getAllGames({
      search,
      category,
      minPrice: Number.isNaN(minPrice) ? undefined : minPrice,
      maxPrice: Number.isNaN(maxPrice) ? undefined : maxPrice,
      sort,
    });

    res.json({
      games,
      total: games.length,
    });
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await GameModel.getGameById(Number(req.params.id));

    if (!game) {
      return res.status(404).json({ message: "Game not found." });
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
};

const getTopRatedGames = async (req, res, next) => {
  try {
    const topGames = await GameModel.getTopRatedGames(4);

    res.json({
      games: topGames,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGames,
  getGameById,
  getTopRatedGames,
};
