import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Truck, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper to ensure we have a clean number for the total
  const total = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/,/g, '')) 
      : item.price;
    return sum + price;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);

    try {
      // 1. Create the Order in Django
      // Note: Use your machine's IP if testing on a physical phone
      const orderResponse = await axios.post('http://127.0.0.1:8000/api/orders/', {
        customer_name: customerName || "Annex Customer",
        phone_number: phoneNumber,
        location: location,
        items: cart.map(item => ({
          product: item.id,
          custom_name: item.customizations?.name || '',
          custom_number: item.customizations?.number || ''
        })),
        total_amount: total
      });

      const orderId = orderResponse.data.id;

      // 2. Trigger the STK Push
      const paymentResponse = await axios.post('http://127.0.0.1:8000/api/process-payment/', {
        phone: phoneNumber,
        amount: total,
        order_id: orderId
      });

      if (paymentResponse.data.ResponseCode === "0") {
        alert("🚀 Request sent! Enter your M-Pesa PIN on your phone to complete the purchase.");
        navigate('/success');

        // Logic to redirect or clear cart could go here
      } else {
        alert("M-Pesa Error: " + paymentResponse.data.ResponseDescription);
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to connect to the backend. Ensure your Django server is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-pitch pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Form (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-turf text-[10px] font-bold uppercase tracking-widest mb-4 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Pitch
          </button>

          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Checkout</h1>
            <p className="text-gray-400 uppercase text-xs tracking-[0.2em]">Secure M-Pesa Payment | Eldoret Annex</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-turf tracking-widest block mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Norman Boit"
                  className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold outline-none focus:border-turf"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-turf tracking-widest block mb-2">M-Pesa Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="0712345678"
                  className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold outline-none focus:border-turf"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-turf tracking-widest block mb-2">Delivery / Pickup Location</label>
              <select 
                required
                className="w-full bg-white/5 border border-white/10 p-4 text-white font-bold outline-none focus:border-turf appearance-none cursor-pointer"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" className="bg-zinc-900">Select Location</option>
                <option value="annex" className="bg-zinc-900">Annex Shop (Pickup)</option>
                <option value="cbd" className="bg-zinc-900">Eldoret CBD</option>
                <option value="mu" className="bg-zinc-900">Moi University</option>
                <option value="langas" className="bg-zinc-900">Langas / Kapseret</option>
              </select>
            </div>

            <button 
              disabled={isProcessing || cart.length === 0}
              className="w-full bg-turf py-5 text-pitch font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Requesting STK Push...
                </>
              ) : (
                `Pay KES ${total.toLocaleString()}`
              )}
            </button>
          </form>

          <div className="flex gap-6 text-gray-500 pt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-turf" /> SSL Secured
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <Truck className="w-4 h-4 text-turf" /> Annex Express
            </div>
          </div>
        </div>

        {/* Right: Summary (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-white/5 border border-white/10 p-8 sticky top-28">
            <h2 className="text-xl font-bold uppercase mb-6 border-b border-white/10 pb-4 italic">Summary</h2>
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold uppercase leading-tight">{item.name}</p>
                    {item.customizations && (
                      <p className="text-[10px] text-turf font-bold mt-1 uppercase">
                        Print: {item.customizations.name} #{item.customizations.number}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap">KES {item.price}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/10">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-tighter">Amount to Pay</span>
              <span className="text-3xl font-black italic">KES {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;