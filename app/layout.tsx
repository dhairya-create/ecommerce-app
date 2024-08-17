'use client'
import '../app/globals.css';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en"> 
    <body>
    
      <CartProvider>
      <Header />
        <main>{children}</main>
      </CartProvider>
    </body>
  </html>
  );
}
