'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import ProductSkeleton from './skeleton/ProductSkeleton'; // Import the skeleton component

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state, dispatch } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Sync quantities with cart state
    const updatedQuantities: Record<number, number> = {};
    state.products.forEach(product => {
      updatedQuantities[product.id] = product.quantity;
    });
    setQuantities(updatedQuantities);
  }, [state.products]);

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => {
      const newQuantity = (prev[productId] || 0) + delta;
      if (newQuantity < 0) return prev; // Prevent going below 0

      // Update quantities state
      const updatedQuantities = { ...prev, [productId]: newQuantity };
      setQuantities(updatedQuantities);

      // Directly dispatch to update cart
      const product = products.find(p => p.id === productId);
      if (product) {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: newQuantity } });
      }

      return updatedQuantities;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-6 mt-20 md:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex justify-center">
              <Image 
                src={product.image} 
                alt={product.title} 
                width={150} 
                height={150} 
                className="object-contain h-48 w-full"
              />
            </div>
            <h2 className="text-lg font-bold mt-4 text-gray-800">{product.title}</h2>
            <p className="text-lg font-semibold text-gray-600">${product.price.toFixed(2)}</p>

           
            <div className="mt-2 flex items-center">
              <div className="bg-green-700 text-white text-sm px-2 py-1 rounded-md flex items-center">
                <span className="mr-1">{product.rating.rate.toFixed(1)}</span>
                <span className="text-white">★</span>
              </div>
              <span className="ml-2 text-gray-600 text-sm">({product.rating.count} reviews)</span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-gray-800 font-semibold">{quantities[product.id] || 0}</span>
                <button 
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                > 
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Render skeletons while loading
        Array(6).fill(0).map((_, index) => (
          <ProductSkeleton key={index} />
        ))
      )}
    </div>
  );
};

export default ProductsPage;
