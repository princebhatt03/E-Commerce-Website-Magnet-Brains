'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { products } from '@/data';

export default function ProductsPage() {
  const { cart, addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-6 text-white">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Our Products
        </h1>
        <p className="text-gray-300 mt-2">
          Browse through our collection and add your favorites to the cart.
        </p>
      </header>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => {
          const inCart = cart.some(item => item.product.id === p.id);
          return (
            <Card
              key={p.id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border border-gray-700">
              {/* Image */}
              <div className="relative w-full h-56">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                {inCart && (
                  <span className="absolute top-2 right-2 bg-green-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    In Cart
                  </span>
                )}
              </div>

              {/* Product Info */}
              <CardContent className="flex flex-col justify-between flex-1 p-5">
                <div className="mb-4">
                  <CardTitle className="text-xl font-bold text-white">
                    {p.name}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mt-1 text-justify">
                    {p.description}
                  </p>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-white">
                    ${(p.price / 100).toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    variant={inCart ? 'secondary' : 'default'}
                    onClick={() => handleAddToCart(p.id)}
                    disabled={inCart}>
                    {inCart ? 'Added' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer / CTA */}
      <section className="text-center mt-16">
        <p className="text-gray-300">
          Want to see your cart?{' '}
          <Button
            variant="link"
            className="text-blue-400 underline"
            onClick={() => (window.location.href = '/cart')}>
            Go to Cart
          </Button>
        </p>
      </section>
    </main>
  );
}
