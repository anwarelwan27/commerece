const db = require("../config/db");

const buildSortClause = (sort) => {
  switch (sort) {
    case "price-asc":
      return "ORDER BY price ASC";
    case "price-desc":
      return "ORDER BY price DESC";
    case "title":
      return "ORDER BY title ASC";
    case "rating":
    default:
      return "ORDER BY rating DESC, id DESC";
  }
};

const getAllGames = async ({
  search = "",
  category = "",
  minPrice,
  maxPrice,
  sort = "rating",
}) => {
  let sql =
    "SELECT id, title, price, image, category, rating, description FROM games WHERE 1 = 1";
  const params = [];

  if (search) {
    sql += " AND title LIKE ?";
    params.push(`%${search}%`);
  }

  if (category && category !== "All") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (Number.isFinite(minPrice)) {
    sql += " AND price >= ?";
    params.push(minPrice);
  }

  if (Number.isFinite(maxPrice)) {
    sql += " AND price <= ?";
    params.push(maxPrice);
  }

  sql += ` ${buildSortClause(sort)}`;

  const [rows] = await db.query(sql, params);
  return rows;
};

const getGameById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, title, price, image, category, rating, description FROM games WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};

const getTopRatedGames = async (limit = 4) => {
  const [rows] = await db.query(
    "SELECT id, title, price, image, category, rating, description FROM games ORDER BY rating DESC, id DESC LIMIT ?",
    [limit]
  );

  return rows;
};

module.exports = {
  getAllGames,
  getGameById,
  getTopRatedGames,
};
