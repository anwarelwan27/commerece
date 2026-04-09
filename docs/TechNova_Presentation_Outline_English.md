# TechNova Store Presentation

## Slide 1: Title
- TechNova Store
- Full-Stack E-Commerce Web Application
- React.js, Express.js, MySQL
- Final Project Presentation

## Slide 2: Project Idea
- TechNova Store is a modern e-commerce website for electronic products.
- Main categories:
  - Mobile Phones
  - Laptops
  - Headphones
  - Keyboards
  - Mice
- The goal was to build a clean, modern, and beginner-friendly full-stack project.

## Slide 3: Technologies Used
- Frontend:
  - React.js
  - React Router
  - Axios
  - Tailwind CSS
- Backend:
  - Node.js
  - Express.js
- Database:
  - MySQL
  - XAMPP + phpMyAdmin

## Slide 4: Database Design
- users
- products
- cart
- orders
- The database also includes sample products and a demo user.

## Slide 5: Backend API
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- GET /api/products/:id
- GET /api/products/top-rated
- POST /api/cart
- GET /api/cart/:userId
- PUT /api/cart/:id
- DELETE /api/cart/:id
- POST /api/orders

## Slide 6: Frontend Pages and Features
- Home Page
- Products Page
- Product Details Page
- Cart Page
- Checkout Page
- Login / Register
- Features:
  - Real-time search
  - Category filter
  - Price filter
  - Dark mode
  - Toast notifications
  - Loading states

## Slide 7: User Flow
- The user registers or logs in.
- The user browses products.
- The user searches and filters products.
- The user opens a product details page.
- The user adds products to the cart.
- The user updates quantities.
- The user checks out.
- A new order is created in the database.

## Slide 8: Easy Code Explanation
- The easiest part to explain is `ProtectedRoute`.
- It checks if the user is logged in.
- If the user is not logged in, it redirects to the login page.
- If the user is logged in, it renders the page normally.

```jsx
if (!isAuthenticated) {
  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

return children;
```

## Slide 9: Conclusion
- TechNova Store connects frontend, backend, and database in one project.
- It is organized, clean, and easy to extend.
- It is suitable as a final project.
- Future improvements:
  - Admin dashboard
  - Payment gateway
  - Order history
  - Product reviews
