import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartSidebar from '../shop/CartSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar state
  const { cart } = useCart();

  return (
    <>
      <nav className="bg-pitch text-white sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Identity */}
            <div className="flex-shrink-0 flex flex-col leading-tight cursor-pointer" onClick={() => window.location.href = '/'}>
              <span className="text-xl font-black tracking-tighter uppercase">
                Norman & Boit
              </span>
              <span className="text-xs font-bold text-turf tracking-[0.3em] uppercase">
                Pitchside
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 font-medium uppercase text-sm tracking-wide">
              <a href="#" className="hover:text-turf transition">New Arrivals</a>
              <a href="#" className="hover:text-turf transition">Leagues</a>
              <a href="#" className="hover:text-turf transition">Custom Printing</a>
              <a href="#" className="hover:text-turf transition">Gadgets</a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              <Search className="w-5 h-5 cursor-pointer hover:text-turf" />
              
              {/* Cart Icon - Now triggers sidebar */}
              <div 
                className="relative cursor-pointer group" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6 group-hover:text-turf transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-turf text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    {cart.length}
                  </span>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-pitch border-t border-white/10 px-4 pt-2 pb-6 space-y-4 uppercase text-sm tracking-widest">
            <a href="#" className="block py-2 border-b border-white/5">New Arrivals</a>
            <a href="#" className="block py-2 border-b border-white/5">Leagues</a>
            <a href="#" className="block py-2 border-b border-white/5">Custom Printing</a>
            <a href="#" className="block py-2 text-turf">Gadgets</a>
          </div>
        )}
      </nav>

      {/* Cart Sidebar is always present, but visibility is controlled by state */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;