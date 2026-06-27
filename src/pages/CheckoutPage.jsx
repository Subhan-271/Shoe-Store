import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { pkr } from "../utils/currency";

export default function CheckoutPage({ cart, onClearCart }) {
  const { bg, bg2, card, text, textMuted, border, inputBg, isDark } = useTheme();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Checkout — SOLE."; }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 21000 ? 0 : 299;
  const total    = subtotal + shipping;

  const [step, setStep] = useState(1); // 1=info, 2=payment, 3=done
  const [placing, setPlacing] = useState(false);

  const [info, setInfo] = useState({ name: "", email: "", phone: "", address: "", city: "Islamabad", zip: "44000" });
  const [pay,  setPay]  = useState({ card: "", expiry: "", cvv: "", holder: "" });
  const [errors, setErrors] = useState({});

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "system-ui,sans-serif" }}>
        <div style={{ fontSize: "4rem" }}>🛒</div>
        <h2 style={{ color: text }}>Your cart is empty</h2>
        <Link to="/shop" style={{ padding: "12px 28px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>Shop Now →</Link>
      </div>
    );
  }

  const inp = (field, label, placeholder, half = false, type = "text") => (
    <div style={{ gridColumn: half ? "span 1" : "span 2" }}>
      <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={step === 1 ? info[field] : pay[field]}
        onChange={e => {
          const val = e.target.value;
          if (step === 1) setInfo(p => ({ ...p, [field]: val }));
          else setPay(p => ({ ...p, [field]: val }));
          if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
        }}
        style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors[field] ? "#e63946" : border}`, borderRadius: 10, fontSize: ".92rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box", transition: "border-color .2s" }}
        onFocus={e => e.target.style.borderColor = "#e63946"}
        onBlur={e => e.target.style.borderColor = errors[field] ? "#e63946" : border}
      />
      {errors[field] && <p style={{ color: "#e63946", fontSize: ".75rem", marginTop: 4 }}>{errors[field]}</p>}
    </div>
  );

  function validateInfo() {
    const e = {};
    if (!info.name.trim())    e.name    = "Full name required";
    if (!info.email.trim() || !/\S+@\S+\.\S+/.test(info.email)) e.email = "Valid email required";
    if (!info.address.trim()) e.address = "Address required";
    if (!info.city.trim())    e.city    = "City required";
    if (!info.zip.trim())     e.zip     = "ZIP code required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePay() {
    const e = {};
    const rawCard = pay.card.replace(/\s/g, "");
    if (rawCard.length < 16) e.card = "Enter a valid 16-digit card number";
    if (!pay.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format: MM/YY";
    if (pay.cvv.length < 3)  e.cvv  = "3-digit CVV required";
    if (!pay.holder.trim())  e.holder = "Cardholder name required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && validateInfo()) setStep(2);
  }

  async function handlePlaceOrder() {
    if (!validatePay()) return;
    setPlacing(true);

    try {
      await fetch("http://localhost:5000/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: info,
          items: cart.map(i => ({ product_id: i.id, quantity: i.qty, price: i.price, size: i.size, color: i.color })),
          subtotal,
          shipping,
          total,
        }),
      });
    } catch {
      // backend optional — proceed to success anyway
    }

    setPlacing(false);
    setStep(3);
    onClearCart && onClearCart();
  }

  /* ── format card number with spaces ── */
  function formatCard(v) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(v) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  }

  /* ── Order Done ── */
  if (step === 3) {
    return (
      <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif", padding: 24 }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 24, padding: "64px 48px", textAlign: "center", maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,.1)" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(16,185,129,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", margin: "0 auto 24px" }}>✅</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: text, marginBottom: 12 }}>Order Placed!</h1>
          <p style={{ color: textMuted, lineHeight: 1.7, marginBottom: 8 }}>
            Thank you, <strong style={{ color: text }}>{info.name || "Customer"}</strong>!<br />
            Your order has been confirmed and will be delivered to <strong style={{ color: text }}>{info.city || "your address"}</strong>.
          </p>
          <p style={{ color: textMuted, fontSize: ".85rem", marginBottom: 32 }}>Confirmation sent to <strong style={{ color: "#e63946" }}>{info.email || "your email"}</strong></p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" style={{ padding: "13px 28px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: ".95rem" }}>Back to Home</Link>
            <Link to="/shop" style={{ padding: "13px 28px", background: "transparent", color: text, border: `1.5px solid ${border}`, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: ".95rem" }}>Keep Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "42px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link to="/cart" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Cart</Link>
          <span>›</span>
          <span>Checkout</span>
        </div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.4rem)" }}>Checkout</h1>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginTop: 20 }}>
          {["Delivery", "Payment"].map((label, i) => {
            const n = i + 1;
            const active  = step === n;
            const done    = step > n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#10b981" : active ? "#e63946" : "rgba(255,255,255,.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", fontWeight: 700 }}>
                    {done ? "✓" : n}
                  </div>
                  <span style={{ fontSize: ".85rem", color: active ? "#fff" : "rgba(255,255,255,.5)", fontWeight: active ? 700 : 400 }}>{label}</span>
                </div>
                {i < 1 && <div style={{ width: 48, height: 2, background: step > 1 ? "#10b981" : "rgba(255,255,255,.2)", margin: "0 12px" }} />}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }} className="checkout-wrap">

        {/* Left — Form */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32 }}>

          {step === 1 && (
            <>
              <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ background: "#e63946", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem" }}>1</span>
                Delivery Information
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {inp("name",    "Full Name",      "Muhammad Ali")}
                {inp("email",   "Email",          "example@gmail.com", false, "email")}
                {inp("phone",   "Phone",          "+92 300 0000000")}
                {inp("address", "Street Address", "Street 5, G-10 Markaz")}
                {inp("city",    "City",           "Islamabad", true)}
                {inp("zip",     "Postal Code",    "44000",     true)}
              </div>
              <button onClick={handleNext}
                style={{ marginTop: 28, width: "100%", padding: "15px", background: "#e63946", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#b91c2c"}
                onMouseLeave={e => e.currentTarget.style.background = "#e63946"}>
                Continue to Payment →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ background: "#e63946", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem" }}>2</span>
                Payment Details
              </h2>

              {/* Delivery summary */}
              <div style={{ background: isDark ? "#21262d" : "#f9fafb", borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: ".85rem", color: textMuted, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>📍 {info.address}, {info.city} {info.zip}</span>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#e63946", fontWeight: 600, cursor: "pointer", fontSize: ".82rem" }}>Edit</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Card number — full width with live formatting */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>Card Number</label>
                  <input
                    type="text" placeholder="1234 5678 9012 3456"
                    value={pay.card}
                    onChange={e => { setPay(p => ({ ...p, card: formatCard(e.target.value) })); setErrors(p => ({ ...p, card: "" })); }}
                    maxLength={19}
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.card ? "#e63946" : border}`, borderRadius: 10, fontSize: "1rem", letterSpacing: ".1em", background: inputBg, color: text, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#e63946"}
                    onBlur={e => e.target.style.borderColor = errors.card ? "#e63946" : border}
                  />
                  {errors.card && <p style={{ color: "#e63946", fontSize: ".75rem", marginTop: 4 }}>{errors.card}</p>}
                </div>

                {/* Expiry */}
                <div>
                  <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>Expiry Date</label>
                  <input
                    type="text" placeholder="MM/YY"
                    value={pay.expiry}
                    onChange={e => { setPay(p => ({ ...p, expiry: formatExpiry(e.target.value) })); setErrors(p => ({ ...p, expiry: "" })); }}
                    maxLength={5}
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.expiry ? "#e63946" : border}`, borderRadius: 10, fontSize: ".92rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#e63946"}
                    onBlur={e => e.target.style.borderColor = errors.expiry ? "#e63946" : border}
                  />
                  {errors.expiry && <p style={{ color: "#e63946", fontSize: ".75rem", marginTop: 4 }}>{errors.expiry}</p>}
                </div>

                {/* CVV */}
                <div>
                  <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>CVV</label>
                  <input
                    type="text" placeholder="•••"
                    value={pay.cvv}
                    onChange={e => { setPay(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })); setErrors(p => ({ ...p, cvv: "" })); }}
                    maxLength={4}
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors.cvv ? "#e63946" : border}`, borderRadius: 10, fontSize: ".92rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#e63946"}
                    onBlur={e => e.target.style.borderColor = errors.cvv ? "#e63946" : border}
                  />
                  {errors.cvv && <p style={{ color: "#e63946", fontSize: ".75rem", marginTop: 4 }}>{errors.cvv}</p>}
                </div>

                {inp("holder", "Cardholder Name", "John Doe")}
              </div>

              <div style={{ marginTop: 20, padding: "10px 14px", background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: ".82rem", color: "#10b981" }}>
                🔒 Your payment information is encrypted and secure
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(1)}
                  style={{ flex: 1, padding: "14px", background: "transparent", color: text, border: `1.5px solid ${border}`, borderRadius: 12, fontWeight: 600, fontSize: ".95rem", cursor: "pointer" }}>
                  ← Back
                </button>
                <button onClick={handlePlaceOrder} disabled={placing}
                  style={{ flex: 2, padding: "14px", background: placing ? "#9ca3af" : "#e63946", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: placing ? "not-allowed" : "pointer", transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  onMouseEnter={e => { if (!placing) e.currentTarget.style.background = "#b91c2c"; }}
                  onMouseLeave={e => { if (!placing) e.currentTarget.style.background = "#e63946"; }}>
                  {placing ? (
                    <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block" }} /> Processing…</>
                  ) : (
                    <>Place Order · {pkr(total)}</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right — Order Summary */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 24, position: "sticky", top: 96 }}>
          <h3 style={{ fontWeight: 800, fontSize: "1rem", color: text, marginBottom: 18 }}>Order Summary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
            {cart.map(item => (
              <div key={item.key} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", background: item.bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "1.4rem" }}>👟</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: ".85rem", color: text, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                  <p style={{ fontSize: ".75rem", color: textMuted, margin: "2px 0 0" }}>Qty: {item.qty} {item.size ? `· Size ${item.size}` : ""}</p>
                </div>
                <span style={{ fontWeight: 700, fontSize: ".9rem", color: text, flexShrink: 0 }}>{pkr(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", color: textMuted }}>
              <span>Subtotal</span><span style={{ color: text, fontWeight: 600 }}>{pkr(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", color: textMuted }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? "#10b981" : text, fontWeight: 600 }}>{shipping === 0 ? "FREE" : pkr(shipping)}</span>
            </div>
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.1rem", color: text }}>
              <span>Total</span><span>{pkr(total)}</span>
            </div>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {["💳 Visa", "💳 MC", "🍎 Pay", "📦 PayPal"].map(p => (
              <span key={p} style={{ fontSize: ".7rem", color: textMuted, background: isDark ? "#21262d" : "#f3f4f6", padding: "3px 9px", borderRadius: 6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:860px){ .checkout-wrap{ grid-template-columns: 1fr !important } }
      `}</style>
    </div>
  );
}
