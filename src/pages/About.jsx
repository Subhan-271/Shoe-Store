import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const team = [
  { name: "Alex Rivera",   role: "Founder & CEO",        emoji: "👨‍💼", bio: "15 years in footwear industry. Passionate about connecting people with their perfect shoe." },
  { name: "Jordan Lee",    role: "Head of Design",        emoji: "👩‍🎨", bio: "Former Nike designer. Believes every shoe tells a story of where you want to go." },
  { name: "Sam Chen",      role: "Operations Director",   emoji: "👨‍💻", bio: "Supply chain expert ensuring every pair reaches you in perfect condition, fast." },
  { name: "Maya Patel",    role: "Customer Experience",   emoji: "👩‍🤝‍👨", bio: "Dedicated to making every SOLE customer feel like a VIP, every single time." },
];

const values = [
  { icon: "🎯", title: "Quality First",       desc: "We never compromise on materials or craftsmanship. Every shoe in our collection passes rigorous quality checks before reaching you." },
  { icon: "🌍", title: "Sustainability",       desc: "We partner with brands committed to eco-friendly production and are actively working toward a fully sustainable supply chain by 2027." },
  { icon: "🤝", title: "Customer Promise",     desc: "We stand behind every product we sell. If you're not 100% satisfied, we make it right — no questions asked." },
  { icon: "⚡", title: "Constant Innovation",  desc: "The footwear industry evolves fast. We stay ahead of trends so you always have access to the latest technology and styles." },
];

export default function About() {
  const { bg, bg2, card, text, textMuted, border } = useTheme();
  useEffect(() => { document.title = "About — SOLE."; }, []);
  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif", color: text, background: bg, minHeight: "100vh" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "60px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>About</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", marginBottom: 8 }}>Our Story</h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1rem" }}>The people and passion behind SOLE</p>
      </div>

      {/* Story */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
          {/* Visual */}
          <FadeUp>
            <div style={{ height: 460, background: "linear-gradient(135deg, #111 0%, #2d2d2d 100%)", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
              <span style={{ fontSize: "7rem", filter: "drop-shadow(0 12px 24px rgba(230,57,70,.4))", animation: "float 4s ease-in-out infinite" }}>👟</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Founded in 2019</div>
                <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.5)" }}>San Francisco, CA</div>
              </div>
            </div>
          </FadeUp>

          {/* Text */}
          <FadeUp delay={120}>
            <span style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 12 }}>Who We Are</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, marginBottom: 20 }}>We Believe Every Step <span style={{ color: "#e63946", fontStyle: "italic" }}>Matters</span></h2>
            <p style={{ color: textMuted, lineHeight: 1.8, marginBottom: 16, fontSize: ".98rem" }}>
              SOLE was born in 2019 from a simple frustration — finding quality shoes online shouldn't feel like a gamble. Our founder Alex Rivera, after years in the footwear industry, set out to build a store that puts authenticity, quality, and customer experience first.
            </p>
            <p style={{ color: textMuted, lineHeight: 1.8, marginBottom: 16, fontSize: ".98rem" }}>
              What started as a small operation in a San Francisco apartment is now one of the fastest-growing premium footwear destinations, serving over 50,000 customers across the country.
            </p>
            <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: ".98rem" }}>
              From running shoes engineered for marathons to limited-edition street drops, we curate only the best — so you can focus on the journey, not the gear.
            </p>
            <div style={{ marginTop: 32 }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#b91c2c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#e63946"; e.currentTarget.style.transform = "none"; }}>
                Shop Our Collection →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: bg2, padding: "72px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="stats-grid">
              {[
                ["50k+",  "Happy Customers"],
                ["500+",  "Shoe Styles"],
                ["99%",   "Satisfaction Rate"],
                ["2-Day", "Avg. Delivery"],
              ].map(([num, lbl], i) => (
                <div key={lbl} style={{ textAlign: "center", padding: "40px 20px", background: card, border: `1px solid ${border}`, borderRadius: 20, transition: "all .28s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#e63946", marginBottom: 8 }}>{num}</div>
                  <div style={{ fontSize: ".88rem", color: "#6b7280", fontWeight: 500 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>What Drives Us</span>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900 }}>Our Core <span style={{ color: "#e63946", fontStyle: "italic" }}>Values</span></h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="values-grid">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 80}>
                <div style={{ display: "flex", gap: 20, padding: "28px 24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, transition: "all .28s", alignItems: "flex-start" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 56, height: 56, background: "rgba(230,57,70,.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>{v.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 8 }}>{v.title}</h3>
                    <p style={{ color: "#4b5563", fontSize: ".9rem", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#f9fafb", padding: "80px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 10 }}>The People</span>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900 }}>Meet Our <span style={{ color: "#e63946", fontStyle: "italic" }}>Team</span></h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="team-grid">
            {team.map((m, i) => (
              <FadeUp key={m.name} delay={i * 80}>
                <div style={{ textAlign: "center", padding: "32px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, transition: "all .28s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 16px" }}>{m.emoji}</div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: ".82rem", color: "#e63946", fontWeight: 600, marginBottom: 10 }}>{m.role}</p>
                  <p style={{ fontSize: ".82rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{m.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#e63946", padding: "80px 0", textAlign: "center" }}>
        <FadeUp>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>Ready to Find Your Perfect Pair?</h2>
          <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 32, fontSize: "1.05rem" }}>Browse our full collection and experience the SOLE difference.</p>
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 36px", background: "#fff", color: "#e63946", borderRadius: 100, fontWeight: 800, fontSize: "1rem", textDecoration: "none", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#e63946"; }}>
            Shop Now →
          </Link>
        </FadeUp>
      </section>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @media(max-width:860px){ .about-grid{grid-template-columns:1fr!important} }
        @media(max-width:768px){ .stats-grid{grid-template-columns:repeat(2,1fr)!important} .team-grid{grid-template-columns:repeat(2,1fr)!important} .values-grid{grid-template-columns:1fr!important} }
        @media(max-width:480px){ .stats-grid{grid-template-columns:repeat(2,1fr)!important} .team-grid{grid-template-columns:1fr 1fr!important} }
      `}</style>
    </div>
  );
}
