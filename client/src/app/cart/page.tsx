'use client';
import React from 'react';
import axios from 'axios';
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
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Quick Shoping Cart Page
      </h1>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cart Items ({cart.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-gray-800">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-600 mb-4">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="py-3 flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{item.product.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.product.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${(item.product.price / 100).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => decreaseQuantity(item.product.id)}>
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => increaseQuantity(item.product.id)}>
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
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">
                    ${(total / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1">
                    Clear Cart
                  </Button>
                  <Button
                    className="w-full flex-1"
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
  