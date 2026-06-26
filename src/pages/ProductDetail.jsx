import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Stars({ rating }) {
  return (
    <>
      {[1,2,3,4,5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: "1.1rem" }}>★</span>
      ))}
    </>
  );
}

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [activeTab, setActiveTab] = useState("desc");

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "120px 24px", fontFamily: "system-ui,sans-serif" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>😕</div>
        <h2 style={{ marginBottom: 12 }}>Product not found</h2>
        <Link to="/shop" style={{ color: "#e63946", fontWeight: 600 }}>← Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function addToCart() {
    if (!selectedSize) {
      setToast({ show: true, msg: "Please select a size first!" });
      setTimeout(() => setToast({ show: false, msg: "" }), 2500);
      return;
    }
    onAddToCart && onAddToCart(product, selectedSize, product.colors?.[selectedColor] ?? "#000");
    setToast({ show: true, msg: `${product.name} added to cart!` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  }

  function handleRelatedAdd(p) {
    onAddToCart && onAddToCart(p, p.sizes?.[2] ?? 9, p.colors?.[0] ?? "#000");
    setToast({ show: true, msg: `${p.name} added!` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  }

  const sizes = product.sizes ?? [7, 8, 9, 10, 11, 12];
  const colors = product.colors ?? ["#e63946", "#1a1a1a", "#f8f8f8"];

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif", color: "#111", background: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "14px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px", display: "flex", gap: 8, fontSize: ".85rem", color: "#6b7280" }}>
          <Link to="/"     style={{ color: "#6b7280", textDecoration: "none" }}>Home</Link><span>›</span>
          <Link to="/shop" style={{ color: "#6b7280", textDecoration: "none" }}>Shop</Link><span>›</span>
          <span style={{ color: "#111", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Detail */}
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "52px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="detail-grid">

          {/* Left — Product Image */}
          <div>
            <div style={{ borderRadius: 24, overflow: "hidden", height: 460, background: product.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <span style={{ fontSize: "11rem", transform: "rotate(-15deg)", filter: "drop-shadow(0 20px 40px rgba(0,0,0,.25))", transition: "transform .4s ease" }}
                onMouseEnter={e => e.target.style.transform = "rotate(-5deg) scale(1.05)"}
                onMouseLeave={e => e.target.style.transform = "rotate(-15deg)"}>
                {product.emoji}
              </span>
            </div>
            {/* Thumbnail row */}
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 80, height: 80, borderRadius: 12, background: product.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", border: i === 0 ? "2px solid #e63946" : "2px solid #e5e7eb", cursor: "pointer", opacity: i === 0 ? 1 : 0.65, transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e63946"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i === 0 ? "#e63946" : "#e5e7eb"; e.currentTarget.style.opacity = i === 0 ? "1" : "0.65"; }}>
                  {product.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div>
            <p style={{ fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#e63946", marginBottom: 8 }}>{product.category}</p>
            <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, marginBottom: 14, lineHeight: 1.15 }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Stars rating={product.rating} />
              <span style={{ fontSize: ".9rem", fontWeight: 700, color: "#374151" }}>{product.rating}</span>
              <span style={{ fontSize: ".85rem", color: "#9ca3af" }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: "2.2rem", fontWeight: 900 }}>${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: "1.1rem", color: "#9ca3af", textDecoration: "line-through" }}>${product.originalPrice.toFixed(2)}</span>
                  <span style={{ background: "#10b981", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: ".8rem", fontWeight: 700 }}>-{discount}%</span>
                </>
              )}
            </div>

            {/* Size */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#374151" }}>
                  Size {selectedSize && <span style={{ color: "#e63946" }}>— UK {selectedSize}</span>}
                </span>
                <a href="#" style={{ fontSize: ".8rem", color: "#e63946", textDecoration: "none" }}>Size Guide →</a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    minWidth: 52, padding: "9px 12px",
                    border: selectedSize === s ? "2px solid #111" : "2px solid #e5e7eb",
                    borderRadius: 8, fontSize: ".9rem", fontWeight: 600,
                    background: selectedSize === s ? "#111" : "#fff",
                    color: selectedSize === s ? "#fff" : "#4b5563",
                    cursor: "pointer", transition: "all .2s",
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#374151", display: "block", marginBottom: 10 }}>Color</span>
              <div style={{ display: "flex", gap: 10 }}>
                {colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)} style={{
                    width: 32, height: 32, borderRadius: "50%", background: c,
                    border: selectedColor === i ? "2px solid #111" : "2px solid transparent",
                    boxShadow: selectedColor === i ? "0 0 0 3px rgba(0,0,0,.15)" : "none",
                    cursor: "pointer", transition: "all .2s",
                    outline: "none",
                  }} title={c} />
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
              {/* Qty */}
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 48, background: "#f9fafb", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#374151" }}>−</button>
                <span style={{ width: 44, textAlign: "center", fontSize: "1rem", fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 48, background: "#f9fafb", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#374151" }}>+</button>
              </div>

              {/* Add to cart */}
              <button onClick={addToCart} style={{ flex: 1, padding: "14px 24px", background: "#e63946", color: "#fff", border: "none", borderRadius: 12, fontSize: "1rem", fontWeight: 700, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#b91c2c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#e63946"; e.currentTarget.style.transform = "none"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Cart
              </button>

              {/* Wishlist */}
              <button onClick={() => setWished(w => !w)} style={{ width: 52, height: 52, border: `2px solid ${wished ? "#e63946" : "#e5e7eb"}`, borderRadius: 12, background: wished ? "rgba(230,57,70,.08)" : "#fff", fontSize: "1.3rem", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {wished ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", gap: 0 }}>
                {["desc", "features", "delivery"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: "10px 18px", border: "none", background: "transparent",
                    fontSize: ".88rem", fontWeight: 600, cursor: "pointer",
                    color: activeTab === tab ? "#e63946" : "#6b7280",
                    borderBottom: activeTab === tab ? "2px solid #e63946" : "2px solid transparent",
                    transition: "all .2s", textTransform: "capitalize",
                  }}>
                    {tab === "desc" ? "Description" : tab === "features" ? "Features" : "Delivery"}
                  </button>
                ))}
              </div>
              <div style={{ paddingTop: 16 }}>
                {activeTab === "desc" && (
                  <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: ".95rem" }}>
                    {product.description ?? `The ${product.name} combines premium materials with cutting-edge design for superior comfort and performance. Whether you're hitting the gym or the streets, these shoes deliver exceptional style and durability.`}
                  </p>
                )}
                {activeTab === "features" && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {(product.features ?? ["Premium build quality", "Comfortable fit", "Durable outsole", "Stylish design"]).map((f) => (
                      <li key={f} style={{ display: "flex", gap: 10, fontSize: ".9rem", color: "#4b5563" }}>
                        <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "delivery" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      ["🚀", "Express Shipping", "2-3 business days — Free on orders over $75"],
                      ["↩️", "Easy Returns",     "30-day hassle-free returns, no questions asked"],
                      ["🛡️", "Authenticity",      "100% genuine product, directly from the brand"],
                    ].map(([icon, title, desc]) => (
                      <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ fontSize: "1.3rem" }}>{icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: 2 }}>{title}</div>
                          <div style={{ fontSize: ".85rem", color: "#6b7280" }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stock status */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".85rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              <span style={{ color: "#10b981", fontWeight: 600 }}>In Stock</span>
              <span style={{ color: "#9ca3af" }}>— Ships within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 32, textAlign: "center" }}>
              You May Also <span style={{ color: "#e63946", fontStyle: "italic" }}>Like</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="related-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleRelatedAdd} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      <div style={{ position: "fixed", bottom: 32, left: "50%", transform: toast.show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100px)", opacity: toast.show ? 1 : 0, background: "#111", color: "#fff", padding: "14px 24px", borderRadius: 100, fontWeight: 600, fontSize: ".92rem", boxShadow: "0 8px 32px rgba(0,0,0,.2)", transition: "all .35s cubic-bezier(.34,1.56,.64,1)", zIndex: 9999, pointerEvents: "none", borderLeft: "4px solid #e63946", whiteSpace: "nowrap" }}>
        🛒 {toast.msg}
      </div>

      <style>{`
        @media(max-width:860px){ .detail-grid{grid-template-columns:1fr!important} }
        @media(max-width:900px){ .related-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:480px){ .related-grid{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
