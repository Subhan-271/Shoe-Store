import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const DEMO_ORDERS = {
  "SOLE-1001": { status: 3, product: "CloudRunner X Pro", date: "27 Jun 2026", city: "Islamabad", steps: ["Order Placed", "Processing", "Dispatched", "Out for Delivery", "Delivered"] },
  "SOLE-1002": { status: 2, product: "Court King Elite",  date: "26 Jun 2026", city: "Lahore",    steps: ["Order Placed", "Processing", "Dispatched", "Out for Delivery", "Delivered"] },
};

export default function OrderTracking() {
  const { bg, bg2, card, text, textMuted, border, inputBg, isDark } = useTheme();
  useEffect(() => { document.title = "Order Tracking — SOLE."; }, []);

  const [orderId, setOrderId] = useState("");
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  function track(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!orderId.trim()) { setError("Please enter your Order ID."); return; }
    setLoading(true);
    setTimeout(() => {
      const found = DEMO_ORDERS[orderId.trim().toUpperCase()];
      if (found) setResult(found);
      else setError("Order not found. Please check your Order ID and try again.");
      setLoading(false);
    }, 800);
  }

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Order Tracking</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📦</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Track Your Order</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>Enter your Order ID to see real-time status</p>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "52px 24px" }}>

        {/* Search form */}
        <form onSubmit={track} style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <label style={{ display: "block", fontWeight: 700, fontSize: ".85rem", textTransform: "uppercase", letterSpacing: ".06em", color: textMuted, marginBottom: 8 }}>Order ID</label>
          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text" placeholder="e.g. SOLE-1001"
              value={orderId} onChange={e => setOrderId(e.target.value)}
              style={{ flex: 1, padding: "13px 16px", border: `1.5px solid ${border}`, borderRadius: 10, fontSize: ".95rem", background: inputBg, color: text, outline: "none" }}
              onFocus={e => e.target.style.borderColor = "#e63946"}
              onBlur={e => e.target.style.borderColor = border}
            />
            <button type="submit" disabled={loading}
              style={{ padding: "13px 28px", background: loading ? "#9ca3af" : "#e63946", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "…" : "Track"}
            </button>
          </div>
          {error && <p style={{ color: "#e63946", fontSize: ".85rem", marginTop: 10, margin: "10px 0 0" }}>{error}</p>}
          <p style={{ fontSize: ".78rem", color: textMuted, marginTop: 10, margin: "10px 0 0" }}>
            💡 Try demo: <button type="button" onClick={() => setOrderId("SOLE-1001")} style={{ background: "none", border: "none", color: "#e63946", cursor: "pointer", fontWeight: 600, padding: 0 }}>SOLE-1001</button> or <button type="button" onClick={() => setOrderId("SOLE-1002")} style={{ background: "none", border: "none", color: "#e63946", cursor: "pointer", fontWeight: 600, padding: 0 }}>SOLE-1002</button>
          </p>
        </form>

        {/* Result */}
        {result && (
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{orderId.toUpperCase()}</div>
                <div style={{ fontSize: ".85rem", color: textMuted }}>{result.product} · Ordered {result.date}</div>
                <div style={{ fontSize: ".85rem", color: textMuted }}>Delivering to: {result.city}</div>
              </div>
              <span style={{ background: "rgba(16,185,129,.12)", color: "#10b981", padding: "5px 14px", borderRadius: 100, fontSize: ".8rem", fontWeight: 700 }}>
                {result.steps[result.status]}
              </span>
            </div>

            {/* Progress steps */}
            <div style={{ position: "relative" }}>
              {result.steps.map((step, i) => {
                const done    = i <= result.status;
                const current = i === result.status;
                return (
                  <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: i < result.steps.length - 1 ? 0 : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "#10b981" : (isDark ? "#21262d" : "#f3f4f6"), border: `2px solid ${done ? "#10b981" : border}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: ".85rem", color: done ? "#fff" : textMuted, transition: "all .3s" }}>
                        {done ? "✓" : i + 1}
                      </div>
                      {i < result.steps.length - 1 && (
                        <div style={{ width: 2, height: 36, background: i < result.status ? "#10b981" : border, transition: "background .3s" }} />
                      )}
                    </div>
                    <div style={{ paddingTop: 6, paddingBottom: i < result.steps.length - 1 ? 0 : 0 }}>
                      <div style={{ fontWeight: current ? 700 : 500, color: current ? text : textMuted, fontSize: ".9rem" }}>{step}</div>
                      {current && <div style={{ fontSize: ".78rem", color: "#10b981", marginTop: 2 }}>● Current status</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
