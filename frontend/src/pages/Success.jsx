import React from 'react';
import { CheckCircle, Package, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pitch flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-turf/20 p-6 rounded-full animate-bounce">
            <CheckCircle className="w-16 h-16 text-turf" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Order Sent!</h1>
          <p className="text-gray-400 uppercase text-xs tracking-[0.3em]">Check your phone for the M-Pesa PIN prompt</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 text-left space-y-4">
          <div className="flex items-center gap-4">
            <Package className="text-turf w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Preparing your Kit</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-turf w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Delivery to Eldoret Annex</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full border border-white/20 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-pitch transition-all"
        >
          Return to Pitchside
        </button>
      </div>
    </div>
  );
};

export default Success;