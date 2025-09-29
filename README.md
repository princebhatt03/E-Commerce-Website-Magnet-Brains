Demo E-Commerce Project – Job Task for Magnet Brains IT Solutions
## Overview

This project is a demo e-commerce web application built as part of a job task for Magnet Brains IT Solutions. It demonstrates frontend and backend development skills, including a functional shopping cart, product listing, and Stripe payment integration.

The project is structured with a Next.js frontend (Client folder) using TypeScript and a Node.js backend (Server folder) with Express and MongoDB for handling routes, orders, and data management.

## Features

Product Listing: Browse all available products.

Shopping Cart: Add, remove, and update product quantities.

Checkout: Stripe integration in test mode for payments.

Responsive Design: Works on mobile, tablet, and desktop screens.

Dark Mode UI: Modern and clean user interface.

Full-stack Implementation: Frontend in Next.js + TypeScript, backend in Node.js + Express + MongoDB.

## Project Structure
```
project-root/
│
├── Client/                # Next.js frontend (TypeScript)
│   ├── app/               # Pages and components
│   ├── components/        # Reusable UI components
│   ├── context/           # React context for cart management
│   └── data/              # Mock product data
│
├── Server/                # Backend API
│   ├── controllers/       # Route logic for orders and products
│   ├── routes/            # Express routes
│   ├── models/            # MongoDB models
│   └── middlewares/       # Auth, upload, and error handling
│
└── README.md
```
## Tech Stack

# Frontend:

Next.js (App Router) + TypeScript

Axios for API requests

# Backend:

Node.js + Express

MongoDB for database

Stripe API for payment gateway (test mode)

CORS, dotenv, and other necessary middlewares

Installation & Setup
server

Navigate to the server folder:

cd Server

Install dependencies:

npm install

### 🔒 server: `server/.env`
```env
MONGO_URI=Your_Mongo_String
STRIPE_WEBHOOK_SECRET=Your_Strip_Webhook_Secret
STRIPE_SECRET_KEY=Your_Stripe_Key
```

Start the server:

npm run dev

Server will run at: http://localhost:3000

client =

Navigate to the client folder:

cd Client

Install dependencies:

npm install

Run the Next.js app:
npm run dev

Frontend will run at: http://localhost:3000

Usage

Browse products on /products.

Add products to the cart.

View your cart at /cart.

Checkout using Stripe test mode (use Stripe test cards).

### 👨‍💻 Developer
Prince Bhatt

📧 Email: princebhatt316@gmail.com

🌐 Portfolio: [Prince Bhatt](https://princebhatt03.github.io/Portfolio)

💼 GitHub: [princebhatt03](https://github.com/princebhatt03)

💬 LinkedIn: [Prince Bhatt](https://www.linkedin.com/in/prince-bhatt-0958a725a/)

📄 License

This project is created for Job Task in Magnet Brains IT Solutions

✨Thank you for connecting...
