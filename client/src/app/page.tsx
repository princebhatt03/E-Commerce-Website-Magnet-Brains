'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to the Demo Project
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Created as a job task for{' '}
          <span className="font-semibold">Magnet Brains Software Solution</span>
        </p>
        <p className="text-gray-600 mb-4">
          Developed by <span className="font-semibold">Prince Bhatt</span>
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => router.push('/products')}
            className="px-6 py-2">
            View Products
          </Button>
          <Button
            onClick={() => router.push('/cart')}
            className="px-6 py-2"
            variant="outline">
            Go to Cart
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              About This Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              This is a demo e-commerce website built with{' '}
              <span className="font-semibold">Next.js</span> and{' '}
              <span className="font-semibold">React</span>. It includes a
              shopping cart, checkout with Stripe (test mode), and a responsive
              design.
            </p>
            <p className="text-gray-700">
              The purpose of this project is to showcase frontend and full-stack
              development skills as part of a job task for{' '}
              <span className="font-semibold">
                Magnet Brains Software Solution
              </span>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact & Portfolio Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Contact & Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Email:{' '}
              <span className="text-blue-600 font-medium">
                princebhatt316@gmail.com
              </span>
            </p>
            <p className="text-gray-700">
              GitHub:{' '}
              <span
                onClick={() => router.push('https://github.com/princebhatt03')}
                className="text-blue-600 font-medium cursor-pointer underline">
                https://github.com/princebhatt03
              </span>
            </p>
            <p className="text-gray-700">
              LinkedIn:{' '}
              <span
                onClick={() =>
                  router.push(
                    'https://www.linkedin.com/in/prince-bhatt-0958a725a/'
                  )
                }
                className="text-blue-600 font-medium cursor-pointer underline">
                https://www.linkedin.com/in/prince-bhatt-0958a725a/
              </span>
            </p>
            <p className="text-gray-700">
              Portfolio:{' '}
              <span
                onClick={() =>
                  router.push('https://princebhatt03.github.io/Portfolio/')
                }
                className="text-blue-600 font-medium cursor-pointer underline">
                Portfolio Webiste
              </span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Call-to-Action */}
      <section className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Explore Demo Features
        </h2>
        <p className="text-gray-700 mb-6">
          Check the shopping cart, product listings, and Stripe checkout in test
          mode.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => router.push('/products')}>
            View Products
          </Button>
          <Button
            onClick={() => router.push('/cart')}
            variant="outline">
            Go to Cart
          </Button>
        </div>
      </section>
    </main>
  );
}
