import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sustainability() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "Sustainability — SOLE."; }, []);

  const goals = [
    { icon: "♻️", title: "Recycled Packaging",    desc: "100% of our shipping boxes are made from recycled materials. No plastic wrap, no excess packaging.", done: true },
    { icon: "🌱", title: "Carbon Neutral by 2027", desc: "We are offsetting all delivery emissions through verified reforestation projects in northern Pakistan.", done: false },
    { icon: "💧", title: "Water-Safe Partners",    desc: "We only work with manufacturers who meet international water safety and zero-discharge standards.", done: true },
    { icon: "🤝", title: "Fair Wages",             desc: "Every supplier in our chain is audited annually to ensure fair wages and safe working conditions.", done: true },
    { icon: "🔋", title: "Solar-Powered Warehouse", desc: "Our Islamabad warehouse runs on 60% solar energy. Target: 100% renewable by end of 2026.", done: false },
    { icon: "👟", title: "Shoe Recycling Program",  desc: "Drop old shoes at our store — we partner with NGOs to donate or recycle every pair.", done: true },
  ];

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#064e3b,#059669)", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.55)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Sustainability</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🌍</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Our Commitment to the Planet</h1>
        <p style={{ color: "rgba(255,255,255,.7)" }}>Every step we take, we take responsibly</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px" }}>

        {/* Intro */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 52px", lineHeight: 1.8, color: textMuted, fontSize: ".98rem" }}>
          At SOLE, we believe that great shoes shouldn't cost the Earth. That's why sustainability is built into every decision we make — from the suppliers we choose to the box your shoes arrive in.
        </div>

        {/* Goals grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 48 }} className="sust-grid">
          {goals.map(g => (
            <div key={g.title} style={{ background: card, border: `1px solid ${g.done ? "rgba(16,185,129,.3)" : border}`, borderRadius: 18, padding: 24, position: "relative" }}>
              {g.done && (
                <span style={{ position: "absolute", top: 14, right: 14, background: "rgba(16,185,129,.12)", color: "#10b981", fontSize: ".72rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>
                  ✓ Achieved
                </span>
              )}
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{g.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{g.title}</h3>
              <p style={{ fontSize: ".88rem", color: textMuted, lineHeight: 1.7, margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Shoe recycling CTA */}
        <div style={{ background: "linear-gradient(135deg,#064e3b,#059669)", borderRadius: 20, padding: "40px 32px", textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>👟</div>
          <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Have Old Shoes?</h2>
          <p style={{ color: "rgba(255,255,255,.75)", marginBottom: 24, fontSize: ".95rem" }}>
            Drop them at our Islamabad store. We'll make sure they find a new home or are recycled responsibly.
          </p>
          <Link to="/contact" style={{ padding: "12px 28px", background: "#fff", color: "#064e3b", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>
            Find Our Store
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .sust-grid{ grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
