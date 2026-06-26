import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products, categories, testimonials } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeContext";

/* ─── small helpers ─── */
function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ msg, show }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100px)",
      opacity: show ? 1 : 0,
      background: "#111", color: "#fff",
      padding: "14px 24px", borderRadius: 100,
      fontWeight: 600, fontSize: ".92rem",
      boxShadow: "0 8px 32px rgba(0,0,0,.2)",
      transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
      zIndex: 9999, pointerEvents: "none",
      borderLeft: "4px solid #e63946",
      whiteSpace: "nowrap",
    }}>
      🛒 {msg}
    </div>
  );
}

/* ─── Stars ─── */
function Stars({ n }) {
  return (
    <>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? "#f59e0b" : "#d1d5db" }}>★</span>
      ))}
    </>
  );
}

/* ════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════ */
export default function Home({ onAddToCart, cartCount = 0 }) {
  const { bg, bg2, card, text, textMuted, border, isDark } = useTheme();
  useEffect(() => { document.title = "SOLE. — Premium Footwear Store"; }, []);

  const [toast, setToast] = useState({ show: false, msg: "" });
  const [email, setEmail] = useState("");
  const [heroShoeIndex, setHeroShoeIndex] = useState(0);

  const heroShoes = ["👟", "🥾", "👞", "👡"];

  useEffect(() => {
    const t = setInterval(() => setHeroShoeIndex(i => (i + 1) % heroShoes.length), 2800);
    return () => clearInterval(t);
  }, []);

  function handleAddToCart(product) {
    if (onAddToCart) onAddToCart(product);
    setToast({ show: true, msg: `${product.name} added to cart!` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  }

  function handleNewsletter(e) {
    e.preventDefault();
    setToast({ show: true, msg: "You're on the list! 🎉" });
    setEmail("");
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  }

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", color: text, background: bg }}>

      {/* ══════ HERO ══════ */}
      <section style={{
        minHeight: "calc(100vh - 72px)", background: "#111",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* glow blobs */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 72% 50%, rgba(230,57,70,.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 60% at 20% 80%, rgba(230,57,70,.07) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "80px 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(230,57,70,.15)", border: "1px solid rgba(230,57,70,.3)", color: "#ff6b77", padding: "6px 16px", borderRadius: 100, fontSize: ".78rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 24 }}>
              <span>⚡</span> New Season Collection 2025
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Walk Your Story,<br />
              <span style={{ color: "#e63946", fontStyle: "italic" }}>One Step</span> at a Time
            </h1>

            <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1.1rem", maxWidth: 460, lineHeight: 1.7, marginBottom: 36 }}>
              Discover footwear crafted for performance, style, and every adventure life throws your way — from track to trail to downtown.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, fontSize: "1rem", textDecoration: "none", transition: "all .25s", boxShadow: "0 8px 24px rgba(230,57,70,.4)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#b91c2c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#e63946"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Shop Now →
              </Link>
              <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", border: "2px solid rgba(255,255,255,.3)", color: "#fff", borderRadius: 100, fontWeight: 600, fontSize: "1rem", textDecoration: "none", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}>
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.1)" }}>
              {[["500+", "Styles"], ["50k+", "Customers"], ["4.9★", "Rating"]].map(([num, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff" }}>{num}</div>
                  <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: ".07em" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated shoe */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* rings */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(230,57,70,.15)", animation: "spinRing 20s linear infinite" }} />
              <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px dashed rgba(255,255,255,.07)", animation: "spinRing 30s linear infinite reverse" }} />
              {/* glow */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,.22) 0%, transparent 70%)", animation: "pulseGlow 3s ease-in-out infinite" }} />

              {/* shoe */}
              <span key={heroShoeIndex} style={{ fontSize: "9rem", transform: "rotate(-20deg)", filter: "drop-shadow(0 20px 40px rgba(230,57,70,.5))", animation: "floatShoe 4s ease-in-out infinite, popIn .4s cubic-bezier(.34,1.56,.64,1)", position: "relative", zIndex: 2 }}>
                {heroShoes[heroShoeIndex]}
              </span>

              {/* floating tags */}
              <div style={{ position: "absolute", top: "14%", left: "-14%", background: "#fff", borderRadius: 14, padding: "10px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.2)", animation: "floatTag 3s ease-in-out infinite .4s" }}>
                <div style={{ fontSize: ".72rem", color: "#6b7280" }}>New Drop</div>
                <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#e63946" }}>CloudRunner X</div>
              </div>
              <div style={{ position: "absolute", bottom: "16%", right: "-12%", background: "#fff", borderRadius: 14, padding: "10px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.2)", animation: "floatTag 3.5s ease-in-out infinite .9s" }}>
                <div style={{ fontSize: ".72rem", color: "#6b7280" }}>Limited Sale</div>
                <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#e63946" }}>Up to 30% OFF</div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatShoe  { 0%,100%{transform:rotate(-20deg) translateY(0)} 50%{transform:rotate(-20deg) translateY(-18px)} }
          @keyframes floatTag   { 0%,100%{transform:translateY(0)}                50%{transform:translateY(-10px)} }
          @keyframes spinRing   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
          @keyframes pulseGlow  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
          @keyframes popIn      { from{opacity:0;transform:rotate(-20deg) scale(.6)} to{opacity:1;transform:rotate(-20deg) scale(1)} }
          @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          @media(max-width:860px){ .hero-grid{grid-template-columns:1fr !important} }
        `}</style>
      </section>

      {/* ══════ BRAND STRIP ══════ */}
      <div style={{ background: "#0a0a0a", padding: "36px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 64, animation: "scrollLeft 22s linear infinite", width: "max-content" }}>
          {["Nike","Adidas","New Balance","Puma","Reebok","Asics","Skechers","Brooks","Nike","Adidas","New Balance","Puma","Reebok","Asics","Skechers","Brooks"].map((b, i) => (
            <span key={i} style={{ fontSize: "1.2rem", fontWeight: 800, color: "rgba(255,255,255,.25)", textTransform: "uppercase", letterSpacing: ".12em", whiteSpace: "nowrap" }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ══════ CATEGORIES ══════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>Browse by Category</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, marginBottom: 12 }}>Find Your Perfect <span style={{ color: "#e63946", fontStyle: "italic" }}>Fit</span></h2>
            <p style={{ color: "#6b7280", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>From high-performance running shoes to sophisticated formal footwear — we have the perfect pair for every occasion.</p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }} className="cats-grid">
            {categories.map((c, i) => (
              <FadeUp key={c.id} delay={i * 60}>
                <Link to={`/shop?cat=${c.id}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "28px 12px", background: "#fff", border: "2px solid #e5e7eb", borderRadius: 20, textAlign: "center", textDecoration: "none", transition: "all .28s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e63946"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <span style={{ fontSize: "2.4rem" }}>{c.emoji}</span>
                  <span style={{ fontSize: ".9rem", fontWeight: 700, color: "#374151" }}>{c.name}</span>
                  <span style={{ fontSize: ".75rem", color: "#9ca3af" }}>{c.count} styles</span>
                </Link>
              </FadeUp>
            ))}
          </div>
          <style>{`@media(max-width:900px){.cats-grid{grid-template-columns:repeat(3,1fr)!important}} @media(max-width:500px){.cats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
        </div>
      </section>

      {/* ══════ FEATURED PRODUCTS ══════ */}
      <section style={{ padding: "80px 0", background: bg2 }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>Handpicked for You</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, marginBottom: 12 }}>Featured <span style={{ color: "#e63946", fontStyle: "italic" }}>Products</span></h2>
            <p style={{ color: "#6b7280", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>Our top-rated shoes loved by thousands of customers worldwide.</p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="prod-grid">
            {products.map((p, i) => (
              <FadeUp key={p.id} delay={i * 70}>
                <ProductCard product={p} onAddToCart={handleAddToCart} index={i} />
              </FadeUp>
            ))}
          </div>
          <style>{`@media(max-width:1100px){.prod-grid{grid-template-columns:repeat(3,1fr)!important}} @media(max-width:780px){.prod-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:480px){.prod-grid{grid-template-columns:1fr!important}}`}</style>

          <FadeUp style={{ textAlign: "center", marginTop: 44 }}>
            <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border: "2px solid #111", color: "#111", borderRadius: 100, fontWeight: 700, fontSize: "1rem", textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}>
              View All Products →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════ WHY US ══════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>Why Choose SOLE</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800 }}>Built for Those Who <span style={{ color: "#e63946", fontStyle: "italic" }}>Move</span></h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="feat-grid">
            {[
              { icon: "🚀", title: "Free Express Shipping", desc: "Orders over $75 ship free with 2-day express delivery right to your door, no minimum required." },
              { icon: "↩️", title: "Easy 30-Day Returns",   desc: "Not the right fit? Return any item within 30 days, hassle-free. Full refund guaranteed." },
              { icon: "🛡️", title: "100% Authentic",        desc: "Every shoe is sourced directly from brands and authorized distributors. Authenticity guaranteed." },
              { icon: "💬", title: "24/7 Expert Support",   desc: "Our team of footwear experts is available around the clock to help you find the perfect shoe." },
            ].map((f, i) => (
              <FadeUp key={f.title} delay={i * 90}>
                <div style={{ padding: "32px 28px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, transition: "all .28s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: 56, height: 56, background: "rgba(230,57,70,.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: 20 }}>{f.icon}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: ".9rem", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <style>{`@media(max-width:900px){.feat-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:500px){.feat-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section style={{ padding: "80px 0", background: bg2 }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>Customer Reviews</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800 }}>What Our <span style={{ color: "#e63946", fontStyle: "italic" }}>Customers</span> Say</h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="test-grid">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 90}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 28, transition: "all .28s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "1.1rem", color: "#f59e0b", marginBottom: 14 }}><Stars n={t.rating} /></div>
                  <p style={{ color: "#4b5563", fontSize: ".95rem", lineHeight: 1.75, marginBottom: 20 }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.1rem", color: "#4b5563", flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: ".9rem" }}>{t.name}</div>
                      <div style={{ fontSize: ".78rem", color: "#9ca3af" }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <style>{`@media(max-width:900px){.test-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:560px){.test-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ══════ NEWSLETTER ══════ */}
      <section style={{ background: "#e63946", padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <FadeUp>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>Get Early Access & Exclusive Deals</h2>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: "1rem" }}>Join 50,000+ sneaker lovers. Be first to know about new drops and limited editions.</p>
          </FadeUp>
          <FadeUp delay={100}>
            <form onSubmit={handleNewsletter} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                type="email" required placeholder="Enter your email address"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding: "14px 20px", borderRadius: 100, border: "2px solid rgba(255,255,255,.35)", background: "rgba(255,255,255,.15)", color: "#fff", fontSize: ".95rem", width: 300, outline: "none" }} />
              <button type="submit" style={{ padding: "14px 28px", background: "#fff", color: "#e63946", border: "none", borderRadius: 100, fontWeight: 700, fontSize: ".95rem", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.target.style.background = "#111"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.color = "#e63946"; }}>
                Subscribe Free
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ══════ QUICK CONTACT ══════ */}
      <section style={{ padding: "88px 0", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="qc-grid">

          {/* Left — info */}
          <FadeUp>
            <div style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 14 }}>Contact Us</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 }}>
              Got a Question?<br /><span style={{ color: "#e63946", fontStyle: "italic" }}>We're Here</span> to Help.
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32, maxWidth: 400 }}>
              Whether it's about sizing, orders, or just finding the perfect shoe — our team responds within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "✉️", label: "hello@sole.store" },
                { icon: "📞", label: "+1 (555) 123-4567" },
                { icon: "⚡", label: "Live chat — avg. reply < 2 min" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, background: "rgba(230,57,70,.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: ".92rem", color: "#374151", fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={120}>
            <QuickContactForm onToast={(msg) => { setToast({ show: true, msg }); setTimeout(() => setToast({ show: false, msg: "" }), 2800); }} />
          </FadeUp>
        </div>
        <style>{`@media(max-width:860px){.qc-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      <Toast msg={toast.msg} show={toast.show} />
    </div>
  );
}

function QuickContactForm({ onToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.email.trim())   e.email   = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      onToast("Message sent! We'll reply within 24 hrs 🎉");
    }, 1200);
  }

  const field = (key, type = "text", placeholder = "") => ({
    value: form[key],
    onChange: e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: "" })); },
    onFocus: e => { e.target.style.borderColor = "#e63946"; e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,.1)"; },
    onBlur:  e => { e.target.style.borderColor = errors[key] ? "#e63946" : "#d1d5db"; e.target.style.boxShadow = "none"; },
    type, placeholder,
    style: { width: "100%", padding: "12px 14px", border: `1.5px solid ${errors[key] ? "#e63946" : "#d1d5db"}`, borderRadius: 10, fontSize: ".92rem", outline: "none", boxSizing: "border-box", transition: "border-color .2s, box-shadow .2s", background: "#fff", color: "#111" },
  });

  if (sent) return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "48px 36px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 8 }}>Message Sent!</h3>
      <p style={{ color: "#6b7280", fontSize: ".9rem", marginBottom: 20 }}>We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
      <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
        style={{ padding: "10px 24px", background: "#e63946", color: "#fff", border: "none", borderRadius: 100, fontWeight: 700, cursor: "pointer", fontSize: ".9rem" }}>
        Send Another
      </button>
    </div>
  );

  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "36px", boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
      <h3 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 4 }}>Send a Message</h3>
      <p style={{ color: "#9ca3af", fontSize: ".85rem", marginBottom: 24 }}>We respond within 24 hours.</p>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="qc-row">
          <div>
            <input {...field("name", "text", "Your name")} />
            {errors.name && <span style={{ color: "#e63946", fontSize: ".74rem" }}>{errors.name}</span>}
          </div>
          <div>
            <input {...field("email", "email", "Email address")} />
            {errors.email && <span style={{ color: "#e63946", fontSize: ".74rem" }}>{errors.email}</span>}
          </div>
        </div>
        <div>
          <textarea {...field("message", "text", "How can we help you?")} rows={4}
            style={{ ...field("message").style, resize: "vertical", minHeight: 100 }} />
          {errors.message && <span style={{ color: "#e63946", fontSize: ".74rem" }}>{errors.message}</span>}
        </div>
        <button type="submit" disabled={loading}
          style={{ padding: "13px", background: loading ? "#9ca3af" : "#111", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: ".95rem", cursor: loading ? "default" : "pointer", transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#e63946"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#111"; }}>
          {loading ? "Sending..." : "Send Message ✈️"}
        </button>
      </form>
      <style>{`@media(max-width:480px){.qc-row{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
