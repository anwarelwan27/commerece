const db = require("../config/db");

const createOrder = async ({ userId, totalPrice }) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
    [userId, totalPrice]
  );

  const [rows] = await db.query(
    "SELECT id, user_id, total_price, created_at FROM orders WHERE id = ? LIMIT 1",
    [result.insertId]
  );

  return rows[0] || null;
};

module.exports = {
  createOrder,
};
