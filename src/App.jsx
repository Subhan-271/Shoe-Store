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
import CheckoutPage from "./pages/CheckoutPage";
import SizeGuide from "./pages/SizeGuide";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import OrderTracking from "./pages/OrderTracking";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import PressRoom from "./pages/PressRoom";
import Sustainability from "./pages/Sustainability";
import GiftCards from "./pages/GiftCards";

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

  function handleClearCart() {
    setCart([]);
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
              <Route path="/checkout"    element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />} />
              <Route path="/size-guide"     element={<SizeGuide />} />
              <Route path="/shipping"       element={<ShippingInfo />} />
              <Route path="/returns"        element={<Returns />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/faq"            element={<FAQ />} />
              <Route path="/careers"        element={<Careers />} />
              <Route path="/press"          element={<PressRoom />} />
              <Route path="/sustainability"  element={<Sustainability />} />
              <Route path="/gift-cards"     element={<GiftCards />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
