import { useState } from 'react';

const CustomizerModal = ({ product, onConfirm, onClose }) => {
  const [printName, setPrintName] = useState('');
  const [printNumber, setPrintNumber] = useState('');

  return (
    <div className="fixed inset-0 bg-pitch/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-black uppercase mb-2">Customize Your Kit</h2>
        <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest">
          {product.name}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-turf tracking-widest block mb-1">Name on Back</label>
            <input 
              type="text" 
              maxLength="12"
              className="w-full bg-pitch border border-white/10 p-3 text-white uppercase font-bold focus:border-turf outline-none"
              placeholder="e.g. KIPCHOGE"
              value={printName}
              onChange={(e) => setPrintName(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-turf tracking-widest block mb-1">Number</label>
            <input 
              type="text" 
              maxLength="2"
              className="w-full bg-pitch border border-white/10 p-3 text-white font-bold focus:border-turf outline-none"
              placeholder="01"
              value={printNumber}
              onChange={(e) => setPrintNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 border border-white/10 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white/5"
          >
            Skip
          </button>
          <button 
            onClick={() => onConfirm({ name: printName, number: printNumber })}
            className="flex-1 bg-turf py-3 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-pitch transition-colors"
          >
            Confirm Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizerModal;