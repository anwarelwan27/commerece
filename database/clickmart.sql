CREATE DATABASE IF NOT EXISTS clickmart_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clickmart_db;

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password) VALUES
  ('Demo Gamer', 'demo@clickmart.com', '$2b$10$mrFQHK6S4LjnmsZdAS5gGOxGhyfBAMRAtLI68.ntHjMCTjkTVViLS'),
  ('Lina Hassan', 'lina@clickmart.com', '$2b$10$mrFQHK6S4LjnmsZdAS5gGOxGhyfBAMRAtLI68.ntHjMCTjkTVViLS');

INSERT INTO games (title, price, image, category, rating, description) VALUES
  ('Cyber Rift', 59.99, '/images/games/cyber-rift.svg', 'Action', 4.9, 'A neon-soaked action adventure where rogue runners fight corporate AI across vertical megacities.'),
  ('Neon Striker', 39.99, '/images/games/neon-striker.svg', 'Shooter', 4.8, 'Fast-paced arena shooter with flashy abilities, ranked play, and a stylish futuristic soundtrack.'),
  ('Mythic Arena', 49.99, '/images/games/mythic-arena.svg', 'RPG', 4.7, 'Build your legend in a fantasy battleground filled with ancient relics, co-op raids, and rich character builds.'),
  ('Pixel Raiders', 24.99, '/images/games/pixel-raiders.svg', 'Indie', 4.6, 'Retro-inspired roguelite with handcrafted pixel art, hidden dungeons, and addictive replay value.'),
  ('Drift Legends', 29.99, '/images/games/drift-legends.svg', 'Racing', 4.5, 'Master precision drifting across neon highways, desert circuits, and rain-slick city tracks.'),
  ('Shadow Protocol', 44.99, '/images/games/shadow-protocol.svg', 'Stealth', 4.8, 'A tactical stealth thriller about infiltration, hacking, and high-risk missions behind enemy firewalls.'),
  ('Solar Siege', 54.99, '/images/games/solar-siege.svg', 'Strategy', 4.7, 'Command a star-faring fleet and defend the outer colonies in a large-scale real-time strategy campaign.'),
  ('Frost Frontier', 34.99, '/images/games/frost-frontier.svg', 'Adventure', 4.6, 'Survive an icy open world, uncover buried ruins, and make choices that shape your expedition.');

INSERT INTO cart (user_id, game_id, quantity) VALUES
  (1, 1, 1),
  (1, 4, 2);

INSERT INTO orders (user_id, total_price, created_at) VALUES
  (2, 84.98, '2026-03-25 19:20:00');
