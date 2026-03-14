import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home'; // Move your current App.jsx logic here
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import CategoryPage from './pages/CategoryPage';
import CustomPrinting from './pages/CustomPrinting';
function App() {
  return (
    <div className="min-h-screen bg-pitch text-white font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/custom-printing" element={<CustomPrinting />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;