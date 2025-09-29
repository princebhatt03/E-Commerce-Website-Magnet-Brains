import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import orderController from './controllers/orderController.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

app.use(cors());
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'ecomm';
let db, ordersCol;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    ordersCol = db.collection('orders');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

// Stripe webhook endpoint
app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await orderController.updateStatus(ordersCol, session.id, 'success');
    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object;
      await orderController.updateStatus(ordersCol, session.id, 'failed');
    }
    res.json({ received: true });
  }
);

app.use(express.json());
// Mount routes
app.use('/api/orders', (req, res, next) =>
  orderRoutes(ordersCol)(req, res, next)
);

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

// Stripe checkout endpoint
app.post('/api/checkout', async (req, res) => {
  try {
    const { cart, email } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    // Build line items for Stripe Checkout
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.description,
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
    }));
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      customer_email: email,
      metadata: { email },
    });
    // Save order with status 'pending'
    await orderController.create(ordersCol, {
      items: cart,
      status: 'pending',
      transactionId: session.id,
      email,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
});

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
