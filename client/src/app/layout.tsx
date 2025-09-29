
import CartNavbar from "@/components/CartNavbar";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground min-h-screen">
        <CartProvider>
          <CartNavbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
