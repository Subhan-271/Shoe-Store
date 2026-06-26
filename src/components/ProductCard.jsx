import { useState } from "react";
import { Link } from "react-router-dom";
import ShoeIllustration from "./ShoeIllustration";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

function Stars({ rating }) {
  return (
    <span style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: ".9rem" }}>★</span>
      ))}
    </span>
  );
}

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const { toggle, isWishlisted } = useWishlist();
  const { card, text, textMuted, border, isDark } = useTheme();

  const wished = isWishlisted(product.id);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const badgeColors = {
    "New Arrival": "#e63946",
    "Sale":        "#f59e0b",
    "Best Seller": "#111",
    "Top Pick":    "#7c3aed",
    "Limited":     "#0f172a",
  };

  const hasRealImage = product.image && !imgError;

  return (
    <article
      style={{
        background: card, borderRadius: 20,
        border: `1px solid ${border}`, overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        transition: "transform .28s ease, box-shadow .28s ease",
        animation: `fadeSlideUp .45s ease ${Math.min(index, 8) * 60}ms both`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = isDark ? "0 20px 48px rgba(0,0,0,.5)" : "0 20px 48px rgba(0,0,0,.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}
    >
      {/* Image area */}
      <Link to={`/product/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          position: "relative", height: 220,
          background: product.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          {hasRealImage ? (
            <img
              src={product.image} alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 20px 8px" }}>
              <ShoeIllustration shoeType={product.shoeType || "sneaker"} colors={product.shoeColors || []} />
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 12px", borderRadius: 100, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", background: badgeColors[product.badge] || "#111", color: product.badge === "Limited" ? "#c4b5fd" : "#fff", zIndex: 2 }}>
              {product.badge}
            </span>
          )}

          {/* Discount chip */}
          {discount > 0 && (
            <span style={{ position: "absolute", top: 12, right: 12, background: "#10b981", color: "#fff", padding: "4px 10px", borderRadius: 100, fontSize: ".72rem", fontWeight: 700, zIndex: 2 }}>
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <Link to={`/product/${product.id}`} style={{ padding: "16px 16px 4px", display: "flex", flexDirection: "column", gap: 5, flex: 1, textDecoration: "none", color: "inherit" }}>
        <p style={{ fontSize: ".72rem", color: "#e63946", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: 0 }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: ".98rem", fontWeight: 700, color: text, lineHeight: 1.3, margin: 0 }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: ".75rem", color: textMuted }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: text }}>${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span style={{ fontSize: ".85rem", color: textMuted, textDecoration: "line-through" }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </Link>

      {/* Actions row */}
      <div style={{ display: "flex", gap: 0 }}>
        <button
          onClick={() => onAddToCart && onAddToCart(product)}
          style={{ flex: 1, padding: 13, background: "#111", color: "#fff", border: "none", cursor: "pointer", fontSize: ".88rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#e63946"}
          onMouseLeave={e => e.currentTarget.style.background = "#111"}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>

        {/* Wishlist heart */}
        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          style={{ width: 48, background: isDark ? "#21262d" : "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s", borderLeft: `1px solid ${border}` }}
          onMouseEnter={e => e.currentTarget.style.background = wished ? "rgba(230,57,70,.15)" : isDark ? "#30363d" : "#e5e7eb"}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? "#21262d" : "#f3f4f6"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wished ? "#e63946" : "none"} stroke={wished ? "#e63946" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all .25s", transform: wished ? "scale(1.2)" : "scale(1)" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </article>
  );
}
