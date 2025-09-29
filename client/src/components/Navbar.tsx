'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-black text-white shadow mb-8">
      <Link
        href="/"
        className="text-xl font-bold">
        Quick Shoping Application
      </Link>
      <Link
        href="/cart"
        className="relative">
        <ShoppingCart className="w-7 h-7" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
            {cartCount}
          </Badge>
        )}
      </Link>
    </nav>
  );
}
