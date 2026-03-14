import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch all products and filter locally, or adjust the API call
    axios.get(`http://127.0.0.1:8000/api/products/?category=${categoryName}`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  const titles = {
    leagues: "Global Leagues & Club Kits",
    gadgets: "Tech & Fan Accessories",
    arrivals: "Fresh Drops: Season 25/26",
  };

  return (
    <div className="min-h-screen bg-pitch pt-28 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-l-4 border-turf pl-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">
            {titles[categoryName] || categoryName}
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
            Pitchside Exclusive Collection
          </p>
        </header>

        {products.length === 0 && !loading ? (
          <div className="h-64 flex items-center justify-center border border-white/5 bg-white/5">
            <p className="text-gray-500 uppercase font-bold tracking-widest text-xs">No items found in this section</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;