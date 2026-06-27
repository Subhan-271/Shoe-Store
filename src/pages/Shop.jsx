import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeContext";
import { pkr } from "../utils/currency";

export default function Shop({ onAddToCart }) {
  const { bg, bg2, card, text, textMuted, border, inputBg, isDark } = useTheme();
  useEffect(() => { document.title = "Shop — SOLE."; }, []);

  const [searchParams] = useSearchParams();
  const urlCat = searchParams.get("cat");
  const urlQ   = searchParams.get("q") || "";

  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [apiError, setApiError]     = useState(false);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => { setProducts(prods); setCategories(cats); })
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  const [selectedCats, setSelectedCats] = useState(urlCat ? [urlCat] : []);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [onlySale, setOnlySale] = useState(false);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState(urlQ);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggleCat(id) {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function reset() {
    setSelectedCats([]);
    setMaxPrice(350);
    setOnlySale(false);
    setSort("default");
    setSearch("");
  }

  function handleAdd(product) {
    onAddToCart && onAddToCart(product, product.sizes?.[2] ?? 9, product.colors?.[0] ?? "#000");
    setToast({ show: true, msg: `${product.name} added!` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  }

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCats.length > 0)
      list = list.filter((p) => selectedCats.includes(p.category.toLowerCase()));
    if (onlySale) list = list.filter((p) => p.originalPrice > p.price);
    list = list.filter((p) => p.price <= maxPrice);
    if (search.trim())
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      );
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")     list.sort((a, b) => b.id - a.id);
    return list;
  }, [selectedCats, maxPrice, onlySale, sort, search]);

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif", color: text, background: bg, minHeight: "100vh" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Shop</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", marginBottom: 8 }}>All Shoes</h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1rem" }}>Discover our complete collection of premium footwear</p>
      </div>

      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "250px 1fr", gap: 32, alignItems: "start" }} className="shop-wrap">

        {/* Mobile filter toggle */}
        <button className="filter-toggle-btn" onClick={() => setFiltersOpen(o => !o)}
          style={{ display: "none", alignItems: "center", gap: 8, padding: "11px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: ".9rem", cursor: "pointer", marginBottom: 8, width: "100%" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          {filtersOpen ? "Hide Filters" : "Show Filters"}
          {(selectedCats.length > 0 || onlySale || maxPrice < 350) && (
            <span style={{ marginLeft: "auto", background: "#e63946", color: "#fff", borderRadius: 100, padding: "1px 8px", fontSize: ".72rem" }}>
              {selectedCats.length + (onlySale ? 1 : 0) + (maxPrice < 350 ? 1 : 0)}
            </span>
          )}
        </button>

        {/* ── Sidebar ── */}
        <aside className={`shop-sidebar ${filtersOpen ? "sidebar-open" : ""}`} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24, position: "sticky", top: 96 }}>

          {/* Search */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#374151", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" }}>Search</div>
            <input
              type="text" placeholder="Search shoes..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${border}`, borderRadius: 8, fontSize: ".9rem", outline: "none", boxSizing: "border-box", background: inputBg, color: text }}
            />
          </div>

          {/* Categories */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#374151", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" }}>Categories</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {categories.map((c) => (
                <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: selectedCats.includes(c.id) ? "rgba(230,57,70,.07)" : "transparent", transition: "background .2s" }}>
                  <input type="checkbox" checked={selectedCats.includes(c.id)} onChange={() => toggleCat(c.id)} style={{ accentColor: "#e63946", width: 15, height: 15, cursor: "pointer" }} />
                  <span style={{ flex: 1, fontSize: ".9rem", fontWeight: selectedCats.includes(c.id) ? 600 : 400, color: selectedCats.includes(c.id) ? "#e63946" : "#374151" }}>{c.name}</span>
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>{c.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#374151", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" }}>Max Price</div>
            <input type="range" min={0} max={100000} step={1000} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#e63946", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", color: "#6b7280", marginTop: 6 }}>
              <span>Rs. 0</span><span style={{ fontWeight: 700, color: "#e63946" }}>Up to {pkr(maxPrice)}</span>
            </div>
          </div>

          {/* Sale toggle */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 10px", borderRadius: 8, background: onlySale ? "rgba(230,57,70,.07)" : "transparent" }}>
              <input type="checkbox" checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} style={{ accentColor: "#e63946", width: 15, height: 15 }} />
              <span style={{ fontSize: ".9rem", fontWeight: onlySale ? 600 : 400, color: onlySale ? "#e63946" : "#374151" }}>Sale items only</span>
            </label>
          </div>

          <button onClick={reset} style={{ width: "100%", padding: "10px", background: "#f3f4f6", border: "none", borderRadius: 8, fontSize: ".85rem", fontWeight: 600, color: "#4b5563", cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={e => e.target.style.background = "#e5e7eb"}
            onMouseLeave={e => e.target.style.background = "#f3f4f6"}>
            Reset Filters
          </button>
        </aside>

        {/* ── Products ── */}
        <div>
          {/* Sort bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: ".92rem", color: "#6b7280", margin: 0 }}>
              Showing <strong style={{ color: "#111" }}>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <label style={{ fontSize: ".85rem", color: "#6b7280" }}>Sort:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: ".88rem", color: "#111", background: "#fff", cursor: "pointer", outline: "none" }}>
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="prod-grid-shop">
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: card, border: `1px solid ${border}` }}>
                  <div className="skeleton" style={{ height: 220 }} />
                  <div style={{ padding: 16 }}>
                    <div className="skeleton" style={{ height: 16, borderRadius: 8, marginBottom: 10, width: "60%" }} />
                    <div className="skeleton" style={{ height: 22, borderRadius: 8, marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 14, borderRadius: 8, width: "40%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : apiError ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#6b7280" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>⚠️</div>
              <h3 style={{ marginBottom: 8 }}>Could not load products</h3>
              <p>Make sure the backend server is running on port 5000.</p>
              <button onClick={() => { setApiError(false); setLoading(true); Promise.all([fetchProducts(), fetchCategories()]).then(([p,c])=>{setProducts(p);setCategories(c);}).catch(()=>setApiError(true)).finally(()=>setLoading(false)); }}
                style={{ marginTop: 16, padding: "10px 24px", background: "#e63946", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#6b7280" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>🔍</div>
              <h3 style={{ marginBottom: 8 }}>No shoes found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="prod-grid-shop">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAdd} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div style={{ position: "fixed", bottom: 32, left: "50%", transform: toast.show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100px)", opacity: toast.show ? 1 : 0, background: "#111", color: "#fff", padding: "14px 24px", borderRadius: 100, fontWeight: 600, fontSize: ".92rem", boxShadow: "0 8px 32px rgba(0,0,0,.2)", transition: "all .35s cubic-bezier(.34,1.56,.64,1)", zIndex: 9999, pointerEvents: "none", borderLeft: "4px solid #e63946", whiteSpace: "nowrap" }}>
        🛒 {toast.msg}
      </div>

      <style>{`
        @media(max-width:900px){
          .shop-wrap{ grid-template-columns:1fr!important }
          .filter-toggle-btn{ display:flex!important }
          .shop-sidebar{ display:none!important }
          .shop-sidebar.sidebar-open{ display:block!important }
        }
        @media(max-width:700px){ .prod-grid-shop{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:460px){ .prod-grid-shop{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
