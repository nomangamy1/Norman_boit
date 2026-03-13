import { useCart } from '../../context/CartContext';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate(); // 2. Initialize the hook
  
  // Helper to calculate total from KES strings (e.g., "4,500" -> 4500)
  const total = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/,/g, '')) 
      : item.price;
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    onClose(); // Close sidebar first
    navigate('/checkout'); // 3. Navigate to the route defined in App.jsx
  };

  return (
    <div className={`fixed inset-0 z-[150] transition-opacity ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-pitch/80 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      
      {/* Sidebar */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 p-8 transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Your Bag</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X className="w-8 h-8 hover:text-turf" />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-turf scrollbar-track-pitch">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-500 italic uppercase text-sm">Your bag is empty.</p>
              <button 
                onClick={onClose}
                className="text-turf font-bold uppercase tracking-widest text-xs border-b border-turf pb-1"
              >
                Back to Pitch
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 border-b border-white/5 pb-6">
                <div className="w-20 h-24 bg-pitch overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold uppercase text-sm leading-tight">{item.name}</h3>
                  {item.customizations && (
                    <div className="mt-1 flex gap-2">
                       <span className="text-[10px] bg-turf/10 text-turf font-bold px-1.5 py-0.5 rounded uppercase">
                        {item.customizations.name}
                       </span>
                       <span className="text-[10px] bg-white/10 text-white font-bold px-1.5 py-0.5 rounded uppercase">
                        #{item.customizations.number}
                       </span>
                    </div>
                  )}
                  <p className="font-black mt-2 text-white italic">KES {item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-gray-600 hover:text-red-500 self-start transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div className="mt-auto pt-8 border-t border-white/10 bg-zinc-900">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 uppercase text-xs font-bold tracking-widest">Subtotal</span>
              <span className="text-3xl font-black italic text-white">KES {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-white text-pitch py-4 font-black uppercase tracking-widest hover:bg-turf hover:text-white transition-all transform active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;