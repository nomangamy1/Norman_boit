import React, { useState } from 'react';
import CustomizerModal from './CustomizerModal';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddClick = () => {
    if (product.is_customizable) {
      setShowModal(true);
    } else {
      addToCart(product);
    }
  };

  const handleCustomizationConfirm = (customData) => {
    addToCart(product, customData);
    setShowModal(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 group hover:border-turf transition-all duration-500">
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {product.is_customizable && (
          <div className="absolute top-4 left-4 bg-gold text-pitch text-[10px] font-black px-2 py-1 uppercase tracking-tighter">
            Print Ready
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold uppercase tracking-tight truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-black text-white italic">
            <span className="text-xs font-normal not-italic text-gray-500 mr-1 uppercase">Kes</span>
            {product.price}
          </p>
          <button 
            onClick={handleAddClick}
            className="bg-white text-pitch px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-turf hover:text-white transition-all active:scale-95"
          >
            Add To Bag
          </button>
        </div>
      </div>

      {/* Customizer Modal Logic */}
      {showModal && (
        <CustomizerModal 
          product={product} 
          onClose={() => setShowModal(false)}
          onConfirm={handleCustomizationConfirm}
        />
      )}
    </div>
  );
};

export default ProductCard;