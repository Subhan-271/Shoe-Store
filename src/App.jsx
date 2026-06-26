import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product, size, color) {
    setCart((prev) => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, ...product, size, color, qty: 1 }];
    });
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <div style={{ paddingTop: 72 }}>
        <Routes>
          <Route path="/"           element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/shop"       element={<Shop onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/about"      element={<About />} />
          <Route path="/contact"    element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
