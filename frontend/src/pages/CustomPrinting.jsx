import React from 'react';
import { Printer, Palette, Zap } from 'lucide-react';

const CustomPrinting = () => {
  return (
    <div className="min-h-screen bg-pitch pt-28 px-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-4">
            Custom <span className="text-turf">Press.</span>
          </h1>
          <p className="text-gray-400 uppercase text-xs tracking-[0.5em]">Professional Jersey Customization in Eldoret</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Printer />, title: "Vinyl Cut", desc: "Classic sharp numbers for club kits." },
            { icon: <Palette />, title: "Full Color", desc: "Custom logos and tournament badges." },
            { icon: <Zap />, title: "15-Min Turnaround", desc: "Done while you wait at the Annex Shop." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 text-center space-y-4">
              <div className="text-turf flex justify-center">{feature.icon}</div>
              <h3 className="font-bold uppercase text-sm tracking-widest">{feature.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-turf p-12 text-pitch">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">How to Order</h2>
          <p className="font-bold text-sm mb-6">Customization is added during the Checkout process for each jersey. Simply select your kit and enter your name/number.</p>
          <button className="bg-pitch text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-pitch transition-all">
            Browse Kits to Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPrinting;