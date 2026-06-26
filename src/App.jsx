import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

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

  function handleRemove(key) {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }

  function handleUpdateQty(key, qty) {
    if (qty < 1) { handleRemove(key); return; }
    setCart((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <ThemeProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar cartCount={cartCount} />
          <div style={{ paddingTop: 72 }}>
            <Routes>
              <Route path="/"            element={<Home onAddToCart={handleAddToCart} />} />
              <Route path="/shop"        element={<Shop onAddToCart={handleAddToCart} />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/about"       element={<About />} />
              <Route path="/contact"     element={<Contact />} />
              <Route path="/cart"        element={<CartPage cart={cart} onRemove={handleRemove} onUpdateQty={handleUpdateQty} />} />
              <Route path="/wishlist"    element={<WishlistPage onAddToCart={handleAddToCart} />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
