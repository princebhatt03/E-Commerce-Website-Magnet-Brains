"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

export default function CartNavbar() {
  const { cart } = useCart();
  return <Navbar cartCount={cart.length} />;
}
