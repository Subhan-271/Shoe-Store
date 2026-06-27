import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const cols = [
  {
    title: "Shop",
    links: [
      ["Running",        "/shop?cat=running"],
      ["Casual",         "/shop?cat=casual"],
      ["Hiking",         "/shop?cat=hiking"],
      ["Basketball",     "/shop?cat=basketball"],
      ["Formal",         "/shop?cat=formal"],
      ["Limited Edition","/shop?cat=limited"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Size Guide",      "/size-guide"],
      ["Shipping Info",   "/shipping"],
      ["Returns",         "/returns"],
      ["Order Tracking",  "/order-tracking"],
      ["Contact Us",      "/contact"],
      ["FAQ",             "/faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About SOLE",     "/about"],
      ["Careers",        "/careers"],
      ["Press Room",     "/press"],
      ["Sustainability", "/sustainability"],
      ["Gift Cards",     "/gift-cards"],
    ],
  },
];

export default function Footer() {
  const { isDark } = useTheme();
  const footerBg = isDark ? "#070b0f" : "#0a0a0a";
  return (
    <footer style={{ background: footerBg, color: "rgba(255,255,255,.65)", paddingTop: 72 }}>
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>

        {/* Top grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 52, borderBottom: "1px solid rgba(255,255,255,.08)" }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.4rem", fontWeight: 800, color: "#fff", textDecoration: "none", marginBottom: 16 }}>
              <span>👟</span> SOLE<span style={{ color: "#e63946" }}>.</span>
            </Link>
            <p style={{ fontSize: ".9rem", lineHeight: 1.7, maxWidth: 280, margin: "0 0 24px" }}>
              Your one-stop destination for premium footwear. Crafted for performance, designed for life.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {["📸", "🐦", "📘", "🎵"].map((s) => (
                <a key={s} href="#"
                  style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", textDecoration: "none", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e63946"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 18 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href}
                      style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.55)"}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: ".82rem", color: "rgba(255,255,255,.3)" }}>
          <span>© 2025 SOLE Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <Link key={l} to="#"
                style={{ color: "rgba(255,255,255,.3)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "rgba(255,255,255,.75)"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.3)"}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .footer-grid{ grid-template-columns: 1fr 1fr !important } }
        @media(max-width:560px){ .footer-grid{ grid-template-columns: 1fr !important } }
      `}</style>
    </footer>
  );
}
