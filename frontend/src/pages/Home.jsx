import React, { useEffect, useState } from 'react';
import ProductCard from '../components/shop/ProductCard';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your ngrok URL or Local IP if testing on mobile
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-pitch">
        <div className="text-center z-10 px-4">
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 italic leading-none">
            Pitch<span className="text-turf">Side.</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-400 max-w-xl mx-auto mb-10 uppercase tracking-[0.4em] font-medium">
            Norman & Boit | Premium Kits Eldoret
          </p>
          <button className="bg-white text-pitch px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-turf hover:text-white transition-all transform hover:skew-x-[-10deg]">
            Explore Collection
          </button>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-turf/10 rounded-full blur-[150px] animate-pulse" />
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12 border-l-4 border-turf pl-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Season 24/25</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Available at Annex Branch</p>
          </div>
          <div className="hidden md:block text-xs font-black uppercase tracking-widest text-gray-600 italic">
            Viewing {products.length} Items
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-96 bg-white/5 border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;