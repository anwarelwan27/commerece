const db = require("../config/db");

const cartJoinQuery = `
  SELECT
    cart.id,
    cart.user_id,
    cart.game_id,
    cart.quantity,
    games.title,
    games.price,
    games.image,
    games.category,
    games.rating,
    games.description,
    ROUND(cart.quantity * games.price, 2) AS line_total
  FROM cart
  INNER JOIN games ON games.id = cart.game_id
`;

const getCartByUserId = async (userId) => {
  const [rows] = await db.query(
    `${cartJoinQuery} WHERE cart.user_id = ? ORDER BY cart.id DESC`,
    [userId]
  );

  return rows;
};

const getCartItemById = async (id, userId) => {
  const [rows] = await db.query(
    `${cartJoinQuery} WHERE cart.id = ? AND cart.user_id = ? LIMIT 1`,
    [id, userId]
  );

  return rows[0] || null;
};

const findItemByUserAndGame = async (userId, gameId) => {
  const [rows] = await db.query(
    "SELECT id, quantity FROM cart WHERE user_id = ? AND game_id = ? LIMIT 1",
    [userId, gameId]
  );

  return rows[0] || null;
};

const addToCart = async ({ userId, gameId, quantity }) => {
  const existingItem = await findItemByUserAndGame(userId, gameId);

  if (existingItem) {
    // Keep one cart row per game and increase its quantity when the user adds it again.
    await db.query("UPDATE cart SET quantity = quantity + ? WHERE id = ?", [
      quantity,
      existingItem.id,
    ]);

    return getCartItemById(existingItem.id, userId);
  }

  const [result] = await db.query(
    "INSERT INTO cart (user_id, game_id, quantity) VALUES (?, ?, ?)",
    [userId, gameId, quantity]
  );

  return getCartItemById(result.insertId, userId);
};

const updateCartItemQuantity = async ({ id, userId, quantity }) => {
  await db.query("UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?", [
    quantity,
    id,
    userId,
  ]);

  return getCartItemById(id, userId);
};

const deleteCartItem = async ({ id, userId }) => {
  const [result] = await db.query(
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return result.affectedRows > 0;
};

const clearCartByUserId = async (userId) => {
  await db.query("DELETE FROM cart WHERE user_id = ?", [userId]);
};

module.exports = {
  getCartByUserId,
  getCartItemById,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartByUserId,
};
