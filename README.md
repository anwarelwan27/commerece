# ClickMart - Digital Games Store

ClickMart is a full-stack digital games e-commerce web application built with React, Express, and MySQL. It was designed as a polished final project that feels like a modern gaming storefront rather than a generic marketplace, with responsive layouts, real-time search, smart filters, dark mode, cart management, and a clean checkout flow.

## Project Highlights

- Modern gamer-friendly UI with dark/light mode support
- Fully responsive design for mobile, tablet, laptop, and large screens
- Real-time search by game title
- Filtering by category and price range
- Top-rated games section on the homepage
- JWT-based authentication with register/login flows
- Dynamic cart with quantity updates, removal, and live totals
- Checkout flow backed by MySQL order creation
- Toast notifications, loading states, and error handling
- Clean frontend/backend structure for easy explanation in a presentation

## Tech Stack

### Frontend

- React.js with functional components
- React Router
- Axios
- Tailwind CSS
- React Toastify
- Lucide React icons

### Backend

- Node.js
- Express.js
- MySQL2
- JWT authentication
- Bcrypt password hashing

### Database

- MySQL
- XAMPP + phpMyAdmin friendly SQL import

## Screenshots Placeholders

Add your screenshots in [`docs/screenshots/README.md`](/C:/Users/Admin/Desktop/E-commerece/docs/screenshots/README.md) before final submission.

Suggested captures:

- Home page hero and top-rated section
- Games page with live filters
- Game details page
- Cart page
- Checkout page
- Login and register pages

## Folder Structure

```text
ClickMart/
|-- client/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |   |-- common/
|   |   |   |-- games/
|   |   |   |-- home/
|   |   |   `-- layout/
|   |   |-- contexts/
|   |   |-- pages/
|   |   `-- utils/
|   |-- .env.example
|   `-- package.json
|-- server/
|   |-- public/images/games/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   `-- routes/
|   |-- .env.example
|   `-- package.json
|-- database/
|   `-- clickmart.sql
|-- docs/screenshots/
|   `-- README.md
|-- package.json
`-- README.md
```

## Database Tables

The SQL schema is in [`database/clickmart.sql`](/C:/Users/Admin/Desktop/E-commerece/database/clickmart.sql).

Required tables included:

- `users` -> `id`, `name`, `email`, `password`
- `games` -> `id`, `title`, `price`, `image`, `category`, `rating`, `description`
- `cart` -> `id`, `user_id`, `game_id`, `quantity`
- `orders` -> `id`, `user_id`, `total_price`, `created_at`

Seed data includes:

- Demo users
- Sample games
- Sample cart rows
- Sample order row

## API Endpoints

### Authentication

- `POST /api/auth/register` -> register a new user
- `POST /api/auth/login` -> log in and receive a JWT token

### Games

- `GET /api/games` -> fetch all games
- `GET /api/games?search=cyber` -> search by title
- `GET /api/games?category=Action` -> filter by category
- `GET /api/games?minPrice=20&maxPrice=60` -> filter by price range
- `GET /api/games/top-rated` -> get highest-rated games
- `GET /api/games/:id` -> get one game by ID

### Cart

- `POST /api/cart` -> add a game to the logged-in user's cart
- `GET /api/cart/:userId` -> get cart items for a user
- `PUT /api/cart/:id` -> update item quantity
- `DELETE /api/cart/:id` -> remove an item from the cart

### Orders

- `POST /api/orders` -> create an order from the current cart

## Setup Instructions

### 1. Prerequisites

Install or make sure you already have:

- Node.js and npm
- XAMPP
- MySQL running from XAMPP
- phpMyAdmin

### 2. Import the MySQL Database

1. Open XAMPP and start `Apache` and `MySQL`.
2. Open phpMyAdmin from XAMPP.
3. Click `Import`.
4. Select [`database/clickmart.sql`](/C:/Users/Admin/Desktop/E-commerece/database/clickmart.sql).
5. Run the import.
6. Confirm that the `clickmart_db` database and its tables were created.

### 3. Install Dependencies

From the project root:

```bash
npm install
npm run install:all
```

### 4. Configure Environment Variables

Create these files:

- Copy [`server/.env.example`](/C:/Users/Admin/Desktop/E-commerece/server/.env.example) to `server/.env`
- Copy [`client/.env.example`](/C:/Users/Admin/Desktop/E-commerece/client/.env.example) to `client/.env`

Recommended `server/.env` values for XAMPP:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=clickmart_db
JWT_SECRET=clickmart-super-secret
```

Recommended `client/.env` value:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Run the Project

Run both frontend and backend together from the root:

```bash
npm run dev
```

Or run them separately:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

### 6. Open the App

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### 7. Demo Login

Use the seeded demo account:

- Email: `demo@clickmart.com`
- Password: `password123`

## Scripts

### Root

- `npm run dev` -> start client and server together
- `npm run build` -> build the React frontend
- `npm run start` -> start the backend server
- `npm run install:all` -> install client and server dependencies

### Client

- `npm run dev` -> run Vite dev server
- `npm run build` -> create production build
- `npm run preview` -> preview built frontend

### Server

- `npm run dev` -> run backend with Nodemon
- `npm run start` -> run backend with Node

## Notes for Presentation

Useful points to mention in your presentation or technical documentation:

- The app uses React Context to manage theme, authentication, and cart state.
- The backend follows a structured MVC-style setup using `routes`, `controllers`, `models`, and `config`.
- Cover images are served locally from the backend for a more complete project feel.
- The cart and checkout are protected using JWT authentication.
- Extra endpoints such as `PUT /api/cart/:id` and `POST /api/orders` were added to support a realistic shopping flow.

## Reflection

From a student perspective, this project helped me connect frontend design with backend logic in a real business-style scenario. I practiced building reusable React components, connecting Express APIs to MySQL, handling authentication, and organizing a project in a more professional way. The most valuable part was learning how all the layers of a full-stack application work together, from database schema to UI experience.

## Verification

The project was verified locally by:

- Building the frontend successfully with `npm run build` inside `client`
- Loading the backend Express app successfully with Node inside `server`
