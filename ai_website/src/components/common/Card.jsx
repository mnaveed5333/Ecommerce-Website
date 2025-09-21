import React from 'react';
import { Link } from 'react-router-dom';

function Card({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" /> {/* Insert your image */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold text-gray-900">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;