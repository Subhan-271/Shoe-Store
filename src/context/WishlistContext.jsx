import { createContext, useContext, useState, useEffect } from "react";

const WishlistCtx = createContext({ wishlist: [], toggle: () => {}, isWishlisted: () => false, count: 0 });
export const useWishlist = () => useContext(WishlistCtx);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sole-wishlist") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("sole-wishlist", JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  const toggle = (id) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const isWishlisted = (id) => wishlist.includes(id);

  return (
    <WishlistCtx.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistCtx.Provider>
  );
}
