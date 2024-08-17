"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { IoTrashBin } from 'react-icons/io5';

const CartPage = () => {
  const { state, dispatch } = useCart();

  // Filter out products with a quantity of 0
  const filteredProducts = state.products.filter(product => product.quantity > 0);

  // Calculate total items and total price based on filtered products
  const totalItems = filteredProducts.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = filteredProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleRemove = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {totalItems === 0 ? (
        <p className='text-center text-3xl font-semibold'>
          Your cart is empty. <Link href="/" className='text-blue-400'>Continue shopping</Link>
        </p>
      ) : (
        <div>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id} className="border-b py-4 w-[90%] mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-md"/>
                  <div>
                    <p className="text-lg font-bold">{product.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-600">${product.price} each</p>
                    <p className="text-sm text-gray-600">Total: ${product.price * product.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white px-2 py-3 rounded-md"
                >
                 
                  <IoTrashBin />
                </button>
              </li>
            ))}
          </ul>

          <div className='py-4 w-[90%] mx-auto flex items-center justify-between'>
            <p className="mt-4 text-lg">Total items: {totalItems}</p>
            <p className="text-lg">Total price: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
