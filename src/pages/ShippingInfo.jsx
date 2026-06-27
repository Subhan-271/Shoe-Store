import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function ShippingInfo() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "Shipping Info — SOLE."; }, []);

  const methods = [
    { icon: "🚀", name: "Express Delivery", time: "1–2 business days", cost: "Rs. 399", note: "Islamabad, Rawalpindi, Lahore, Karachi" },
    { icon: "📦", name: "Standard Delivery", time: "3–5 business days", cost: "Rs. 199", note: "All major cities across Pakistan" },
    { icon: "🎁", name: "Free Shipping",     time: "3–5 business days", cost: "FREE",    note: "On all orders above Rs. 21,000" },
    { icon: "🏪", name: "Store Pickup",      time: "Ready in 2 hours",  cost: "FREE",    note: "Blue Area, Jinnah Avenue, Islamabad" },
  ];

  const cities = ["Islamabad", "Rawalpindi", "Lahore", "Karachi", "Peshawar", "Quetta", "Faisalabad", "Multan", "Sialkot", "Gujranwala", "Hyderabad", "Abbottabad"];

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Shipping Info</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🚚</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Shipping Information</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>Fast & reliable delivery across Pakistan</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px" }}>

        {/* Shipping methods */}
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 24 }}>Delivery Options</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 48 }} className="ship-grid">
          {methods.map(m => (
            <div key={m.name} style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, padding: 24 }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{m.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>{m.name}</h3>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#e63946", marginBottom: 4 }}>{m.cost}</div>
              <div style={{ fontSize: ".85rem", color: textMuted, marginBottom: 8 }}>⏱ {m.time}</div>
              <div style={{ fontSize: ".8rem", color: textMuted, borderTop: `1px solid ${border}`, paddingTop: 10 }}>{m.note}</div>
            </div>
          ))}
        </div>

        {/* Coverage */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 20 }}>📍 Cities We Deliver To</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {cities.map(c => (
              <span key={c} style={{ padding: "6px 16px", background: bg2, border: `1px solid ${border}`, borderRadius: 100, fontSize: ".85rem", color: text }}>{c}</span>
            ))}
            <span style={{ padding: "6px 16px", background: "rgba(230,57,70,.1)", border: "1px solid rgba(230,57,70,.2)", borderRadius: 100, fontSize: ".85rem", color: "#e63946" }}>+ Many more</span>
          </div>
        </div>

        {/* Policy */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 20 }}>📋 Shipping Policy</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["Order Processing", "Orders placed before 2 PM PKT are dispatched the same day (Mon–Sat). Orders placed on Sunday are dispatched Monday."],
              ["Tracking", "You will receive an SMS with your tracking number once your order is dispatched. Track via our Order Tracking page."],
              ["Packaging", "All shoes are shipped in their original boxes, securely packed to prevent damage during transit."],
              ["Delays", "During sale events or public holidays, delivery may take 1–2 extra days. We'll notify you via SMS."],
            ].map(([title, desc]) => (
              <div key={title} style={{ paddingBottom: 16, borderBottom: `1px solid ${border}` }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: ".9rem", color: textMuted, lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`.ship-grid { @media(max-width:600px){ grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
