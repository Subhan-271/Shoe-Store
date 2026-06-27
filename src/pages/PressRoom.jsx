import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const articles = [
  { outlet: "Dawn Business", date: "15 Jun 2026", headline: "SOLE Becomes Pakistan's Fastest-Growing Online Shoe Retailer", tag: "Feature" },
  { outlet: "The News",      date: "03 May 2026", headline: "Premium Footwear Goes Local: How SOLE is Changing the Game",   tag: "Interview" },
  { outlet: "ARY Tech",      date: "20 Apr 2026", headline: "SOLE.pk Raises Funding to Expand Across 20 Cities",             tag: "Funding" },
  { outlet: "Geo Business",  date: "02 Mar 2026", headline: "SOLE Launches 'NightGlow Limited' — Sells Out in 4 Hours",       tag: "Launch" },
];

export default function PressRoom() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "Press Room — SOLE."; }, []);

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Press Room</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📰</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Press Room</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>News and media coverage about SOLE</p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 52 }} className="press-stats">
          {[["50,000+","Customers"],["12","Cities"],["2019","Founded"],["4.8★","Rating"]].map(([n, l]) => (
            <div key={l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#e63946" }}>{n}</div>
              <div style={{ fontSize: ".82rem", color: textMuted, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Articles */}
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 24 }}>Recent Coverage</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
          {articles.map(a => (
            <div key={a.headline} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: ".85rem", color: "#e63946" }}>{a.outlet}</span>
                  <span style={{ fontSize: ".75rem", color: textMuted }}>{a.date}</span>
                  <span style={{ fontSize: ".72rem", padding: "2px 10px", background: "rgba(230,57,70,.1)", color: "#e63946", borderRadius: 100 }}>{a.tag}</span>
                </div>
                <div style={{ fontWeight: 600, lineHeight: 1.5 }}>{a.headline}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Media kit */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>📁</div>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Media Kit</h3>
          <p style={{ color: textMuted, marginBottom: 20, fontSize: ".9rem" }}>Download our logos, brand guidelines, and high-res product images</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:press@sole.store" style={{ padding: "11px 24px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>
              Contact Press Team
            </a>
          </div>
          <p style={{ color: textMuted, fontSize: ".8rem", marginTop: 12 }}>press@sole.store · +92 51 1234567</p>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .press-stats{ grid-template-columns:repeat(2,1fr)!important } }`}</style>
    </div>
  );
}
