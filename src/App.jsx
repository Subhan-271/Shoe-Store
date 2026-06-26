import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart() {
    setCartCount((n) => n + 1);
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div style={{ paddingTop: 72 }}>
        <Home onAddToCart={handleAddToCart} cartCount={cartCount} />
      </div>
    </>
  );
}

export default App;
