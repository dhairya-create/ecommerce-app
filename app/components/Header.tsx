"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';

const Header = () => {
  const { state } = useCart();
  const totalItems = state.products.reduce((acc, product) => acc + product.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
      {/* E-commerce name with link to home */}
      <Link href="/" className="md:text-2xl text-base  font-bold text-gray-800">
        E-Commerce
      </Link>

      {/* Cart link */}
      <Link href="/cart">
        <div className="flex items-center space-x-2 relative">
          <span className="flex items-center text-lg font-bold">
            My Cart <FaCartShopping size={25} className="ml-2" />
          </span>
          <span
            className={`bg-blue-500 text-white px-2 py-1 rounded-full text-xs absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 transition-transform ${
              animate ? 'animate-ping-scale' : ''
            }`}
          >
            {totalItems}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
