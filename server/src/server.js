require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connection = await db.getConnection();
    connection.release();

    app.listen(PORT, () => {
      console.log(`TechNova Store API server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MySQL. Please check your database settings.");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
