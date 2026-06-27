import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { pkr } from "../utils/currency";

export default function CartPage({ cart, onRemove, onUpdateQty }) {
  const { bg, bg2, card, text, textMuted, border, isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { document.title = "Cart — SOLE."; }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 21000 ? 0 : 299;
  const total    = subtotal + shipping;

  if (cart.length === 0) return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24, fontFamily: "system-ui,sans-serif" }}>
      <div style={{ fontSize: "5rem" }}>🛒</div>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: text }}>Your cart is empty</h2>
      <p style={{ color: textMuted, marginBottom: 8 }}>Looks like you haven't added anything yet.</p>
      <Link to="/shop" style={{ padding: "13px 32px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: ".95rem" }}>
        Shop Now →
      </Link>
    </div>
  );

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "48px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Cart</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: "#fff" }}>
          Shopping Cart <span style={{ color: "#e63946" }}>({cart.reduce((s,i)=>s+i.qty,0)})</span>
        </h1>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }} className="cart-wrap">

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map((item) => (
            <div key={item.key} style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, padding: "20px 24px", display: "flex", gap: 20, alignItems: "center", transition: "box-shadow .2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = isDark ? "0 4px 20px rgba(0,0,0,.4)" : "0 4px 20px rgba(0,0,0,.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>

              {/* Image */}
              <Link to={`/product/${item.id}`} style={{ flexShrink: 0, width: 90, height: 90, borderRadius: 12, overflow: "hidden", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: "2.5rem" }}>👟</span>}
              </Link>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: ".72rem", color: "#e63946", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 4px" }}>{item.category}</p>
                <Link to={`/product/${item.id}`} style={{ color: text, textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "block", marginBottom: 6 }}>{item.name}</Link>
                <div style={{ display: "flex", gap: 12, fontSize: ".82rem", color: textMuted }}>
                  {item.size && <span>Size: <strong style={{ color: text }}>{item.size}</strong></span>}
                  {item.color && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      Color: <span style={{ width: 14, height: 14, borderRadius: "50%", background: item.color, display: "inline-block", border: `1px solid ${border}` }} />
                    </span>
                  )}
                </div>
              </div>

              {/* Qty */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <button onClick={() => onUpdateQty(item.key, item.qty - 1)}
                  style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", fontSize: "1.1rem", color: textMuted, transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? "#21262d" : "#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>−</button>
                <span style={{ width: 36, textAlign: "center", fontWeight: 700, fontSize: ".95rem", color: text }}>{item.qty}</span>
                <button onClick={() => onUpdateQty(item.key, item.qty + 1)}
                  style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", fontSize: "1.1rem", color: textMuted, transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? "#21262d" : "#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>+</button>
              </div>

              {/* Price + Remove */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: text, marginBottom: 8 }}>
                  {pkr(item.price * item.qty)}
                </div>
                <button onClick={() => onRemove(item.key)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#e63946", fontSize: ".82rem", fontWeight: 600, padding: 0, transition: "opacity .15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".7"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#e63946", fontWeight: 600, fontSize: ".9rem", textDecoration: "none", marginTop: 8 }}>
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 28, position: "sticky", top: 96 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.15rem", color: text, marginBottom: 24 }}>Order Summary</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".92rem", color: textMuted }}>
              <span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span>
              <span style={{ color: text, fontWeight: 600 }}>{pkr(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".92rem", color: textMuted }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? "#10b981" : text, fontWeight: 600 }}>
                {shipping === 0 ? "FREE" : pkr(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <div style={{ background: "rgba(230,57,70,.07)", border: "1px solid rgba(230,57,70,.15)", borderRadius: 8, padding: "8px 12px", fontSize: ".78rem", color: "#e63946" }}>
                Add <strong>{pkr(21000 - subtotal)}</strong> more for free shipping!
              </div>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.15rem", color: text }}>
              <span>Total</span>
              <span>{pkr(total)}</span>
            </div>
          </div>

          <button onClick={() => navigate("/checkout")}
            style={{ width: "100%", padding: "15px", background: "#e63946", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginBottom: 12, transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#b91c2c"}
            onMouseLeave={e => e.currentTarget.style.background = "#e63946"}>
            Checkout →
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: ".78rem", color: textMuted }}>
            <span>🔒</span> Secure checkout · 30-day returns
          </div>

          {/* Accepted payments */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${border}`, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["💳 Visa", "💳 MC", "🍎 Pay", "📦 PayPal"].map(p => (
              <span key={p} style={{ fontSize: ".72rem", color: textMuted, background: isDark ? "#21262d" : "#f3f4f6", padding: "3px 10px", borderRadius: 6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){ .cart-wrap{ grid-template-columns: 1fr !important } }
      `}</style>
    </div>
  );
}
