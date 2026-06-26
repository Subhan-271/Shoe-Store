import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage({ onAddToCart }) {
  const { wishlist } = useWishlist();
  const { bg, bg2, card, text, textMuted, border } = useTheme();

  useEffect(() => { document.title = "Wishlist — SOLE."; }, []);

  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "48px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Wishlist</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: "#fff" }}>
          My Wishlist <span style={{ color: "#e63946" }}>({wishlisted.length})</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.5)", marginTop: 8 }}>
          {wishlisted.length === 0 ? "Save items you love and shop them later." : "Your saved items — don't let them get away!"}
        </p>
      </div>

      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "48px 24px" }}>
        {wishlisted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "5rem", marginBottom: 20 }}>🤍</div>
            <h2 style={{ fontWeight: 800, fontSize: "1.5rem", color: text, marginBottom: 12 }}>No saved items yet</h2>
            <p style={{ color: textMuted, marginBottom: 28, fontSize: ".95rem" }}>
              Browse our collection and tap the heart icon to save your favorites.
            </p>
            <Link to="/shop" style={{ padding: "13px 32px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: ".95rem" }}>
              Browse All Shoes →
            </Link>
          </div>
        ) : (
          <>
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <p style={{ color: textMuted, fontSize: ".92rem" }}>
                <strong style={{ color: text }}>{wishlisted.length}</strong> saved item{wishlisted.length !== 1 ? "s" : ""}
              </p>
              <Link to="/shop" style={{ fontSize: ".88rem", color: "#e63946", fontWeight: 600, textDecoration: "none" }}>
                ← Continue Shopping
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="wish-grid">
              {wishlisted.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>

            {/* Move all to cart */}
            <div style={{ marginTop: 48, textAlign: "center", padding: "32px", background: card, border: `1px solid ${border}`, borderRadius: 20 }}>
              <p style={{ color: textMuted, marginBottom: 16 }}>Love everything? Add all to your cart at once.</p>
              <button
                onClick={() => wishlisted.forEach(p => onAddToCart && onAddToCart(p, p.sizes?.[2] ?? 9, p.colors?.[0] ?? "#000"))}
                style={{ padding: "13px 32px", background: "#111", color: "#fff", border: "none", borderRadius: 100, fontWeight: 700, cursor: "pointer", fontSize: ".95rem", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e63946"}
                onMouseLeave={e => e.currentTarget.style.background = "#111"}>
                Add All to Cart ({wishlisted.length} items)
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media(max-width:1100px){ .wish-grid{ grid-template-columns: repeat(3,1fr) !important } }
        @media(max-width:780px){  .wish-grid{ grid-template-columns: repeat(2,1fr) !important } }
        @media(max-width:480px){  .wish-grid{ grid-template-columns: 1fr !important } }
      `}</style>
    </div>
  );
}
