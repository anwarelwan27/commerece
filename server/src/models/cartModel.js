const db = require("../config/db");

const cartJoinQuery = `
  SELECT
    cart.id,
    cart.user_id,
    cart.product_id,
    cart.quantity,
    products.title,
    products.price,
    products.image,
    products.category,
    products.rating,
    products.description,
    ROUND(cart.quantity * products.price, 2) AS line_total
  FROM cart
  INNER JOIN products ON products.id = cart.product_id
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

const findItemByUserAndProduct = async (userId, productId) => {
  const [rows] = await db.query(
    "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? LIMIT 1",
    [userId, productId]
  );

  return rows[0] || null;
};

const addToCart = async ({ userId, productId, quantity }) => {
  const existingItem = await findItemByUserAndProduct(userId, productId);

  if (existingItem) {
    // Keep one cart row per product and increase its quantity when the user adds it again.
    await db.query("UPDATE cart SET quantity = quantity + ? WHERE id = ?", [
      quantity,
      existingItem.id,
    ]);

    return getCartItemById(existingItem.id, userId);
  }

  const [result] = await db.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [userId, productId, quantity]
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
