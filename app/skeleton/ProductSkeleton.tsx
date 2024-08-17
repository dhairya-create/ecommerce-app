import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="border p-4 rounded-md animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4"></div>
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 w-1/2"></div>
      <div className="flex items-center space-x-2 mt-4">
        <div className="bg-gray-300 h-6 w-6 rounded-md"></div>
        <div className="bg-gray-300 h-6 w-6 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
