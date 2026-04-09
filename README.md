# TechNova Store

TechNova Store is a full-stack e-commerce web application for selling modern electronic products such as laptops, mobile phones, keyboards, mice, and headphones. It was built as a beginner-friendly final project using React, Express, and MySQL, with a clean tech-focused interface instead of a generic marketplace look.

## Project Overview

TechNova Store demonstrates how a real e-commerce workflow can be built across the full stack:

- User registration and login with JWT authentication
- Product catalog with search, category filtering, and price filtering
- Top-rated products section on the homepage
- Product details page with quantity selection
- Cart system with add, update, and remove actions
- Checkout flow that creates orders in MySQL
- Dark mode toggle
- Responsive design for mobile, tablet, laptop, and large screens
- Loading states, toast notifications, and clean error handling

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- React Toastify
- Lucide React icons

### Backend

- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing

### Database

- MySQL
- XAMPP + phpMyAdmin

## Main Features

- Real-time product search
- Category filter
- Price range filter
- Top-rated products section
- Cart management
- Checkout page
- Dark mode
- Responsive UI
- Local seeded product images

## Demo Account

Use the seeded account after importing the SQL file:

- Email: `demo@technova.com`
- Password: `password123`

## Project Structure

```text
E-commerece/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── home/
│   │   │   ├── layout/
│   │   │   └── products/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── server/
│   ├── public/
│   │   └── images/
│   │       └── products/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── database/
│   └── technova_store.sql
├── package.json
└── README.md
```

## Database Tables

The project uses the following tables:

1. `users`
2. `products`
3. `cart`
4. `orders`

The SQL file creates the schema, adds a demo user, and inserts sample electronics products.

## API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products?search=`
- `GET /api/products?category=`
- `GET /api/products?minPrice=&maxPrice=`
- `GET /api/products/top-rated`

### Cart

- `POST /api/cart`
- `GET /api/cart/:userId`
- `PUT /api/cart/:id`
- `DELETE /api/cart/:id`

### Orders

- `POST /api/orders`

## Backend Notes

- The backend uses Express with a clean folder structure: `routes/`, `controllers/`, `models/`, and `config/`.
- Passwords are hashed before storing them in MySQL.
- JWT tokens protect cart and checkout routes.
- Cart totals and order totals are calculated on the server.

## Frontend Pages

- Home Page
- Products Page
- Product Details Page
- Cart Page
- Checkout Page
- Login Page
- Register Page

## Setup Instructions

### 1. Install project dependencies

From the root folder:

```bash
npm install
npm run install:all
```

### 2. Set up MySQL using XAMPP and phpMyAdmin

1. Open XAMPP Control Panel.
2. Start `Apache` and `MySQL`.
3. Open phpMyAdmin in your browser.
4. Choose the `Import` tab.
5. Import the file `database/technova_store.sql`.
6. Confirm that the `technova_store` database was created successfully.

### 3. Configure the backend environment

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=technova_store
JWT_SECRET=technova-super-secret
```

If you use the default XAMPP MySQL setup, `DB_USER=root` and `DB_PASSWORD=` usually work.

### 4. Configure the frontend environment

Create `client/.env` based on `client/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Run the backend

```bash
npm run dev:server
```

The backend will run on `http://localhost:5000`.

### 6. Run the frontend

In a new terminal:

```bash
npm run dev:client
```

The frontend will run on `http://localhost:5173`.

### 7. Run both together

From the root folder:

```bash
npm run dev
```

## How Filtering Works

- Typing in the search bar sends a real-time request to the backend.
- Selecting a category filters products by category.
- Entering minimum and maximum prices filters by price range.
- Top-rated sorting is used by default.

## Beginner-Friendly Explanation

This project is organized so each layer has a clear job:

- React handles the interface and user actions.
- Axios sends requests to the Express API.
- Express handles routes and business logic.
- MySQL stores users, products, cart items, and orders.
- JWT keeps protected pages secure after login.

## Reflection

TechNova Store was built to show more than a basic CRUD project. The main goal was to combine clean UI design with practical e-commerce logic, including authentication, filtering, cart management, and checkout. The final result is a full-stack project that is polished enough for presentation, structured clearly for explanation, and simple enough for beginners to understand and extend later.
