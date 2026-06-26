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

  return (
    <article style={{
      background: "#fff",
      borderRadius: 20,
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      transition: "transform .28s ease, box-shadow .28s ease",
      animationDelay: `${index * 80}ms`,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}
    >
      {/* Image area */}
      <a href={`/product/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          position: "relative", height: 220,
          background: product.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <span style={{ fontSize: "5.5rem", transform: "rotate(-15deg)", filter: "drop-shadow(4px 8px 16px rgba(0,0,0,.3))", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)" }}
            onMouseEnter={e => e.target.style.transform = "rotate(-5deg) scale(1.1) translateY(-6px)"}
            onMouseLeave={e => e.target.style.transform = "rotate(-15deg)"}
          >
            {product.emoji}
          </span>
          {product.badge && (
            <span style={{ position: "absolute", top: 14, left: 14, padding: "4px 12px", borderRadius: 100, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", background: badgeColors[product.badge] || "#111", color: product.badge === "Limited" ? "#c4b5fd" : "#fff" }}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span style={{ position: "absolute", top: 14, right: 14, background: "#10b981", color: "#fff", padding: "4px 10px", borderRadius: 100, fontSize: ".72rem", fontWeight: 700 }}>
              -{discount}%
            </span>
          )}
        </div>
      </a>

      {/* Info */}
      <a href={`/product/${product.id}`} style={{ padding: "18px 18px 12px", display: "flex", flexDirection: "column", gap: 6, flex: 1, textDecoration: "none", color: "inherit" }}>
        <p style={{ fontSize: ".75rem", color: "#e63946", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: 0 }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: ".78rem", color: "#9ca3af" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111" }}>${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span style={{ fontSize: ".88rem", color: "#9ca3af", textDecoration: "line-through" }}>${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </a>

      {/* Add to cart */}
      <button
        onClick={() => onAddToCart && onAddToCart(product)}
        style={{
          width: "100%", padding: 13,
          background: "#111", color: "#fff",
          border: "none", cursor: "pointer",
          fontSize: ".88rem", fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background .2s",
        }}
        onMouseEnter={e => e.target.style.background = "#e63946"}
        onMouseLeave={e => e.target.style.background = "#111"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Add to Cart
      </button>
    </article>
  );
}
