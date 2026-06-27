import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const mensTable = [
  { uk: 6,   us: 7,   eu: 39, cm: 24.5 },
  { uk: 7,   us: 8,   eu: 41, cm: 25.4 },
  { uk: 8,   us: 9,   eu: 42, cm: 26.2 },
  { uk: 9,   us: 10,  eu: 43, cm: 27.0 },
  { uk: 10,  us: 11,  eu: 44, cm: 27.9 },
  { uk: 11,  us: 12,  eu: 45, cm: 28.7 },
  { uk: 12,  us: 13,  eu: 46, cm: 29.5 },
  { uk: 13,  us: 14,  eu: 47, cm: 30.3 },
];

const womensTable = [
  { uk: 3,   us: 5,   eu: 36, cm: 22.5 },
  { uk: 4,   us: 6,   eu: 37, cm: 23.2 },
  { uk: 5,   us: 7,   eu: 38, cm: 24.0 },
  { uk: 6,   us: 8,   eu: 39, cm: 24.8 },
  { uk: 7,   us: 9,   eu: 40, cm: 25.5 },
  { uk: 8,   us: 10,  eu: 41, cm: 26.3 },
];

function SizeTable({ data, t }) {
  const { card, border, text, textMuted, isDark } = t;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem" }}>
        <thead>
          <tr style={{ background: "#e63946", color: "#fff" }}>
            {["UK", "US", "EU", "CM"].map(h => (
              <th key={h} style={{ padding: "12px 20px", textAlign: "center", fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? card : (isDark ? "#1c2128" : "#f9fafb"), borderBottom: `1px solid ${border}` }}>
              <td style={{ padding: "12px 20px", textAlign: "center", color: text, fontWeight: 600 }}>{row.uk}</td>
              <td style={{ padding: "12px 20px", textAlign: "center", color: text }}>{row.us}</td>
              <td style={{ padding: "12px 20px", textAlign: "center", color: text }}>{row.eu}</td>
              <td style={{ padding: "12px 20px", textAlign: "center", color: textMuted }}>{row.cm} cm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuide() {
  const t = useTheme();
  const { bg, bg2, card, text, textMuted, border } = t;
  useEffect(() => { document.title = "Size Guide — SOLE."; }, []);

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Size Guide</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📏</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Size Guide</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>Find your perfect fit with our size charts</p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px" }}>

        {/* How to measure */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 20 }}>📐 How to Measure Your Foot</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              ["1", "Place your foot on paper and trace around it"],
              ["2", "Measure the longest distance (heel to toe)"],
              ["3", "Match your measurement to the chart below"],
            ].map(([n, txt]) => (
              <div key={n} style={{ textAlign: "center", padding: 20, background: bg2, borderRadius: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e63946", color: "#fff", fontWeight: 800, fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{n}</div>
                <p style={{ fontSize: ".88rem", color: textMuted, lineHeight: 1.6, margin: 0 }}>{txt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Men's table */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 20 }}>Men's Sizes</h2>
          <SizeTable data={mensTable} t={t} />
        </div>

        {/* Women's table */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 20 }}>Women's Sizes</h2>
          <SizeTable data={womensTable} t={t} />
        </div>

        {/* Tips */}
        <div style={{ background: "rgba(230,57,70,.07)", border: "1px solid rgba(230,57,70,.2)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12, color: "#e63946" }}>💡 Fitting Tips</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Measure your feet in the evening — feet expand during the day",
              "If you are between sizes, go up to the larger size",
              "For hiking boots, consider going half a size up for thick socks",
              "Different brands may vary slightly — check each product's notes",
            ].map(tip => (
              <li key={tip} style={{ display: "flex", gap: 10, fontSize: ".9rem", color: textMuted }}>
                <span style={{ color: "#e63946", flexShrink: 0 }}>✓</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
