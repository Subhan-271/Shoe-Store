import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState("");
  const searchRef = useRef(null);
  const inputRef  = useRef(null);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); setQuery(""); }, [location.pathname]);

  // focus input when search opens
  useEffect(() => { if (searchOpen && inputRef.current) inputRef.current.focus(); }, [searchOpen]);

  // close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  // close on Escape
  useEffect(() => {
    function handler(e) { if (e.key === "Escape") { setSearchOpen(false); setQuery(""); } }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

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
    padding: "8px 14px", borderRadius: 6,
    fontSize: ".92rem", fontWeight: 500,
    textDecoration: "none", transition: "all .2s", display: "block",
  });

  // live search results
  const results = query.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  function goToResult(id) {
    navigate(`/product/${id}`);
    setSearchOpen(false);
    setQuery("");
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

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
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1.5rem", fontWeight: 800, color: "#fff", textDecoration: "none", letterSpacing: "-.02em", flexShrink: 0 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

            {/* Search icon */}
            <button
              onClick={() => { setSearchOpen(s => !s); setQuery(""); }}
              aria-label="Search"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 8, background: searchOpen ? "rgba(230,57,70,.18)" : "transparent", border: "none", cursor: "pointer", color: searchOpen ? "#e63946" : "rgba(255,255,255,.8)", transition: "all .2s" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Cart */}
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

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 998, background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,.08)", boxShadow: "0 12px 48px rgba(0,0,0,.5)" }} ref={searchRef}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 24px" }}>
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12, padding: "0 16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search shoes by name or category..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "1rem", padding: "16px 0", caretColor: "#e63946" }}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontSize: "1.1rem", padding: 4, lineHeight: 1 }}>✕</button>
              )}
            </form>

            {/* Live results */}
            {results.length > 0 && (
              <div style={{ marginTop: 8, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goToResult(p.id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "12px 16px", background: "rgba(255,255,255,.04)", border: "none", borderTop: i > 0 ? "1px solid rgba(255,255,255,.06)" : "none", cursor: "pointer", textAlign: "left", transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(230,57,70,.12)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: p.bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                      {p.image ? (
                        <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                      ) : "👟"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: ".9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".78rem" }}>{p.category}</div>
                    </div>
                    <div style={{ color: "#e63946", fontWeight: 700, fontSize: ".9rem", flexShrink: 0 }}>${p.price.toFixed(2)}</div>
                  </button>
                ))}
                <button
                  onClick={handleSearchSubmit}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px 16px", background: "rgba(230,57,70,.1)", border: "none", borderTop: "1px solid rgba(255,255,255,.06)", cursor: "pointer", color: "#e63946", fontWeight: 600, fontSize: ".88rem", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(230,57,70,.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(230,57,70,.1)"}>
                  View all results for "{query}" →
                </button>
              </div>
            )}

            {query.trim().length > 1 && results.length === 0 && (
              <div style={{ padding: "20px 16px", textAlign: "center", color: "rgba(255,255,255,.35)", fontSize: ".9rem" }}>
                No shoes found for "<span style={{ color: "#fff" }}>{query}</span>"
              </div>
            )}

            {query.trim().length === 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.3)", marginRight: 4, alignSelf: "center" }}>Try:</span>
                {["Running", "Casual", "Basketball", "Hiking", "Formal"].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)}
                    style={{ padding: "4px 12px", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 100, color: "rgba(255,255,255,.55)", fontSize: ".78rem", cursor: "pointer", transition: "all .15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,57,70,.15)"; e.currentTarget.style.borderColor = "rgba(230,57,70,.3)"; e.currentTarget.style.color = "#e63946"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}>
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
