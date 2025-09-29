'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkout } from '@/api/checkout';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gray-800 shadow-lg rounded-xl border border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Cart Items ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-700 mb-6">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="py-4 flex justify-between items-center hover:bg-gray-700 rounded px-2 transition">
                      <div>
                        <div className="font-semibold text-white">
                          {item.product.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {item.product.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-white">
                          ${(item.product.price / 100).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="text-white border-gray-500 hover:border-white hover:text-white">
                            -
                          </Button>
                          <span className="text-white">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => increaseQuantity(item.product.id)}
                            className="text-white border-gray-500 hover:border-white hover:text-white">
                            +
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}>
                          Remove
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mb-6 text-white">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-xl">
                    ${(total / 100).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <Button
                    variant="outline"
                    className="flex-1 text-white border-gray-500 hover:border-white"
                    onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={async () => {
                      const email = window.prompt(
                        'Enter your email address for the receipt:'
                      );
                      if (!email || !email.includes('@')) {
                        alert('Please enter a valid email address.');
                        return;
                      }
                      try {
                        const res = await checkout(cart, email);
                        if (res) {
                          window.location.href = res.url;
                        } else {
                          alert('Failed to create Stripe Checkout session.');
                        }
                      } catch (err) {
                        alert('Failed to create Stripe Checkout session.');
                      }
                    }}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
