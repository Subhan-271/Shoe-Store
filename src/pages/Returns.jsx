import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Returns() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "Returns & Exchanges — SOLE."; }, []);

  const steps = [
    { icon: "📝", title: "Submit Request",    desc: "Contact us within 30 days of delivery via WhatsApp or email with your order number." },
    { icon: "📦", title: "Pack Your Shoes",   desc: "Place shoes in original box with all tags attached. Shoes must be unworn and in original condition." },
    { icon: "🚚", title: "We Arrange Pickup", desc: "Our courier will pick up the parcel from your address within 1–2 business days. No cost to you." },
    { icon: "✅", title: "Refund / Exchange",  desc: "Once received and inspected, refund is processed within 3–5 business days or exchange is dispatched." },
  ];

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Returns</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>↩️</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Returns & Exchanges</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>30-day hassle-free returns — no questions asked</p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px" }}>

        {/* Steps */}
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 28 }}>How to Return</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 48 }} className="return-grid">
          {steps.map((s, i) => (
            <div key={s.title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e63946", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: ".98rem", margin: 0 }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: ".9rem", color: textMuted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Policy details */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 20 }}>Return Policy</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["✅ Eligible for Return", "Unworn shoes in original box with all tags within 30 days of delivery"],
              ["✅ Free Pickup",         "We arrange courier pickup from your address at no extra cost"],
              ["✅ Full Refund",         "100% refund to original payment method within 3–5 business days"],
              ["✅ Easy Exchange",       "Exchange for a different size or colour — same or different product"],
              ["❌ Not Eligible",        "Worn, damaged, or shoes without original packaging. Sale items marked 'Final Sale'"],
            ].map(([label, desc]) => (
              <div key={label} style={{ display: "flex", gap: 12, paddingBottom: 14, borderBottom: `1px solid ${border}` }}>
                <span style={{ fontWeight: 700, fontSize: ".9rem", minWidth: 160, flexShrink: 0, color: label.startsWith("❌") ? "#e63946" : "#10b981" }}>{label}</span>
                <span style={{ fontSize: ".9rem", color: textMuted }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: "rgba(230,57,70,.07)", border: "1px solid rgba(230,57,70,.2)", borderRadius: 16, padding: 24, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Need help with a return?</div>
            <div style={{ fontSize: ".88rem", color: textMuted }}>WhatsApp: <strong style={{ color: text }}>+92 300 1234567</strong> &nbsp;·&nbsp; Email: <strong style={{ color: text }}>returns@sole.store</strong></div>
          </div>
          <Link to="/contact" style={{ padding: "11px 24px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: ".9rem", whiteSpace: "nowrap" }}>
            Contact Us →
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .return-grid{ grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
