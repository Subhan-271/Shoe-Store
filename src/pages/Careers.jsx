import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const jobs = [
  { title: "Frontend Developer",      dept: "Engineering",  type: "Full-time", loc: "Islamabad" },
  { title: "Social Media Manager",    dept: "Marketing",    type: "Full-time", loc: "Islamabad / Remote" },
  { title: "Customer Support Agent",  dept: "Support",      type: "Full-time", loc: "Islamabad" },
  { title: "Warehouse Associate",     dept: "Operations",   type: "Full-time", loc: "Islamabad" },
  { title: "Graphic Designer",        dept: "Creative",     type: "Part-time", loc: "Remote" },
  { title: "Sales Executive",         dept: "Sales",        type: "Full-time", loc: "Lahore / Karachi" },
];

export default function Careers() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "Careers — SOLE."; }, []);

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Careers</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💼</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Join Our Team</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>Build Pakistan's best shoe store with us</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px" }}>

        {/* Why work with us */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 52 }} className="career-grid">
          {[
            ["🏢", "Modern Office",    "Beautiful workspace in Blue Area, Islamabad with all amenities"],
            ["📈", "Growth",           "Fast-growing company with clear career progression paths"],
            ["🎁", "Perks",            "Health insurance, shoe discounts, flexible hours & more"],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: ".85rem", color: textMuted, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 24 }}>Open Positions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {jobs.map(job => (
            <div key={job.title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{job.title}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".78rem", color: textMuted }}>🏢 {job.dept}</span>
                  <span style={{ fontSize: ".78rem", color: textMuted }}>📍 {job.loc}</span>
                  <span style={{ fontSize: ".78rem", padding: "2px 10px", background: "rgba(230,57,70,.1)", color: "#e63946", borderRadius: 100, fontWeight: 600 }}>{job.type}</span>
                </div>
              </div>
              <a href={`mailto:careers@sole.store?subject=Application: ${job.title}`}
                style={{ padding: "10px 22px", background: "#111", color: "#fff", borderRadius: 100, fontWeight: 600, textDecoration: "none", fontSize: ".88rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                Apply Now →
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", color: textMuted, fontSize: ".9rem" }}>
          Don't see your role? Email your CV to <strong style={{ color: text }}>careers@sole.store</strong>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .career-grid{ grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
