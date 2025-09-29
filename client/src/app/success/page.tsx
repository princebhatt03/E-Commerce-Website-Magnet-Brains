"use client"
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();
  useEffect(() => {
     clearCart();
  }, []); 
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-600">Payment Successful!</h1>
      <p className="text-center text-lg">Thank you for your order. Your payment was processed successfully.</p>
    </main>
  );
}
