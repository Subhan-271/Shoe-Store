import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const links = [
    { label: "Home",    to: "/" },
    { label: "Shop",    to: "/shop" },
    { label: "About",   to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const linkStyle = (to) => ({
    color: isActive(to) ? "#e63946" : "rgba(255,255,255,.75)",
    background: isActive(to) ? "rgba(230,57,70,.12)" : "transparent",
    padding: "8px 14px",
    borderRadius: 6,
    fontSize: ".92rem",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all .2s",
    display: "block",
  });

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 72, background: "#111",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,.4)" : "none",
        transition: "box-shadow .3s",
      }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.5rem", fontWeight: 800, color: "#fff", textDecoration: "none", letterSpacing: "-.02em" }}>
            <span style={{ fontSize: "1.6rem" }}>👟</span>
            SOLE<span style={{ color: "#e63946" }}>.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="desktop-nav" style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0 }}>
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} style={linkStyle(l.to)}
                  onMouseEnter={e => { if (!isActive(l.to)) { e.target.style.color = "#fff"; e.target.style.background = "rgba(255,255,255,.1)"; } }}
                  onMouseLeave={e => { e.target.style.color = isActive(l.to) ? "#e63946" : "rgba(255,255,255,.75)"; e.target.style.background = isActive(l.to) ? "rgba(230,57,70,.12)" : "transparent"; }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/cart" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 8, color: "rgba(255,255,255,.8)", textDecoration: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, width: 18, height: 18, background: "#e63946", color: "#fff", fontSize: ".65rem", fontWeight: 700, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ flexDirection: "column", gap: 5, width: 42, height: 42, alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", borderRadius: 6, padding: 0 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all .3s",
                  transform: menuOpen ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 1 ? "scaleX(0)" : "translateY(-7px) rotate(-45deg)") : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 999, background: "#0a0a0a", padding: 20, borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} style={{ display: "block", color: isActive(l.to) ? "#e63946" : "rgba(255,255,255,.8)", padding: "12px 16px", borderRadius: 10, fontWeight: 500, textDecoration: "none" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/cart" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "#e63946", color: "#fff", borderRadius: 10, fontWeight: 600, textDecoration: "none" }}>
            🛒 View Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      )}
    </>
  );
}
