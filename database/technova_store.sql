CREATE DATABASE IF NOT EXISTS technova_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE technova_store;

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
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
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password) VALUES
  ('Demo User', 'demo@technova.com', '$2b$10$okX6QijCpKpypycVut9jb.x8xD1AqZf9GIlSdL49nxUsB0eBX8ZlG');

INSERT INTO products (title, price, image, category, rating, description) VALUES
  (
    'NovaBook Pro 14',
    1299.00,
    '/images/products/laptop.svg',
    'Laptops',
    4.9,
    'A premium 14-inch laptop with a sharp display, fast SSD storage, and all-day battery life for developers, students, and creators.'
  ),
  (
    'Eclipse Studio 16',
    1699.00,
    '/images/products/laptop.svg',
    'Laptops',
    4.8,
    'A larger performance laptop designed for creative workloads, multitasking, and smooth productivity with a refined aluminum finish.'
  ),
  (
    'Quantum Air X5',
    899.00,
    '/images/products/phone.svg',
    'Mobile Phones',
    4.8,
    'A flagship smartphone with a vivid OLED display, advanced cameras, and reliable all-day performance in a slim body.'
  ),
  (
    'Orbit Phone Lite',
    649.00,
    '/images/products/phone.svg',
    'Mobile Phones',
    4.4,
    'A balanced everyday phone offering dependable battery life, a clean design, and strong value for daily communication and media.'
  ),
  (
    'PulseSound Max',
    249.00,
    '/images/products/headphones.svg',
    'Headphones',
    4.7,
    'Over-ear wireless headphones with active noise cancellation, soft ear cushions, and rich sound for focused work and travel.'
  ),
  (
    'SonicWave ANC',
    199.00,
    '/images/products/headphones.svg',
    'Headphones',
    4.8,
    'A lightweight noise-cancelling headset with clear audio, stable Bluetooth connectivity, and a compact foldable design.'
  ),
  (
    'MechaType K8',
    159.00,
    '/images/products/keyboard.svg',
    'Keyboards',
    4.6,
    'A mechanical keyboard with tactile switches, customizable RGB lighting, and a clean layout built for coding and gaming.'
  ),
  (
    'HexBoard Mini',
    119.00,
    '/images/products/keyboard.svg',
    'Keyboards',
    4.5,
    'A compact 65 percent mechanical keyboard that saves desk space while keeping the typing feel crisp and responsive.'
  ),
  (
    'GlidePoint Pro',
    89.00,
    '/images/products/mouse.svg',
    'Mice',
    4.5,
    'An ergonomic wireless mouse with precise tracking, quiet clicks, and long battery life for productivity and creative work.'
  ),
  (
    'AeroClick Wireless',
    69.00,
    '/images/products/mouse.svg',
    'Mice',
    4.6,
    'A sleek lightweight mouse with low-latency wireless performance and a comfortable shape for everyday use.'
  );
