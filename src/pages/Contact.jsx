import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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

const contactInfo = [
  { icon: "📍", title: "Visit Us",       lines: ["123 Sole Street, Suite 200", "San Francisco, CA 94102"] },
  { icon: "📞", title: "Call Us",        lines: ["+1 (555) 123-4567", "Mon–Fri, 9am – 6pm PST"] },
  { icon: "✉️", title: "Email Us",       lines: ["hello@sole.store", "support@sole.store"] },
  { icon: "⚡", title: "Live Chat",      lines: ["Available 24/7", "Avg. response < 2 min"] },
];

const faqs = [
  { q: "How long does shipping take?",      a: "Standard shipping takes 3-5 business days. Express shipping (2 days) is free on orders over $75." },
  { q: "What is your return policy?",       a: "We offer free 30-day returns on all items. Just initiate a return from your account and we'll send a prepaid label." },
  { q: "Are all products authentic?",       a: "Absolutely. Every product is sourced directly from brands or authorized distributors. We guarantee 100% authenticity." },
  { q: "Can I change my order after placing?", a: "Orders can be modified within 1 hour of placing. Contact us immediately via live chat for the fastest response." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  }

  const inputStyle = (field) => ({
    width: "100%", padding: "13px 16px",
    border: `1px solid ${errors[field] ? "#e63946" : "#d1d5db"}`,
    borderRadius: 10, fontSize: ".92rem", outline: "none",
    background: "#fff", color: "#111", boxSizing: "border-box",
    transition: "border-color .2s",
  });

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif", color: "#111", background: "#fff", minHeight: "100vh" }}>

      {/* Banner */}
      <div style={{ background: "#111", padding: "60px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Contact</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", marginBottom: 8 }}>Get in Touch</h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1rem" }}>We'd love to hear from you — our team is always ready to help</p>
      </div>

      {/* Contact Info Cards */}
      <div style={{ background: "#f9fafb", padding: "56px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="info-grid">
            {contactInfo.map((item, i) => (
              <FadeUp key={item.title} delay={i * 70}>
                <div style={{ textAlign: "center", padding: "28px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, transition: "all .28s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.09)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: 56, height: 56, background: "rgba(230,57,70,.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 10 }}>{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} style={{ fontSize: ".88rem", color: "#6b7280", margin: "3px 0" }}>{l}</p>
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Form + FAQ */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }} className="contact-main">

          {/* Form */}
          <FadeUp>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 24, padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,.06)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.7 }}>Thanks for reaching out, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "General Inquiry", message: "" }); }}
                    style={{ marginTop: 24, padding: "12px 28px", background: "#e63946", color: "#fff", border: "none", borderRadius: 100, fontWeight: 700, cursor: "pointer", fontSize: ".95rem" }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: 8 }}>Send Us a Message</h2>
                  <p style={{ color: "#6b7280", fontSize: ".9rem", marginBottom: 28 }}>Fill in the form and we'll respond within 24 hours.</p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                      <div>
                        <label style={{ display: "block", fontSize: ".83rem", fontWeight: 700, color: "#374151", marginBottom: 7 }}>Full Name *</label>
                        <input type="text" placeholder="John Doe" value={form.name}
                          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                          style={inputStyle("name")}
                          onFocus={e => e.target.style.borderColor = "#e63946"}
                          onBlur={e => e.target.style.borderColor = errors.name ? "#e63946" : "#d1d5db"} />
                        {errors.name && <span style={{ color: "#e63946", fontSize: ".78rem" }}>{errors.name}</span>}
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: ".83rem", fontWeight: 700, color: "#374151", marginBottom: 7 }}>Email Address *</label>
                        <input type="email" placeholder="john@email.com" value={form.email}
                          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                          style={inputStyle("email")}
                          onFocus={e => e.target.style.borderColor = "#e63946"}
                          onBlur={e => e.target.style.borderColor = errors.email ? "#e63946" : "#d1d5db"} />
                        {errors.email && <span style={{ color: "#e63946", fontSize: ".78rem" }}>{errors.email}</span>}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: ".83rem", fontWeight: 700, color: "#374151", marginBottom: 7 }}>Subject</label>
                      <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        style={{ ...inputStyle("subject"), cursor: "pointer" }}>
                        {["General Inquiry", "Order Issue", "Return / Refund", "Size Help", "Product Question", "Partnership"].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ display: "block", fontSize: ".83rem", fontWeight: 700, color: "#374151", marginBottom: 7 }}>Message *</label>
                      <textarea rows={5} placeholder="Tell us how we can help..." value={form.message}
                        onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }}
                        style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }}
                        onFocus={e => e.target.style.borderColor = "#e63946"}
                        onBlur={e => e.target.style.borderColor = errors.message ? "#e63946" : "#d1d5db"} />
                      {errors.message && <span style={{ color: "#e63946", fontSize: ".78rem" }}>{errors.message}</span>}
                    </div>

                    <button type="submit" disabled={loading}
                      style={{ width: "100%", padding: "15px", background: loading ? "#9ca3af" : "#e63946", color: "#fff", border: "none", borderRadius: 12, fontSize: "1rem", fontWeight: 700, cursor: loading ? "default" : "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#b91c2c"; }}
                      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#e63946"; }}>
                      {loading ? "Sending..." : "Send Message ✈️"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeUp>

          {/* FAQ */}
          <FadeUp delay={120}>
            <div>
              <span style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".75rem", fontWeight: 700, color: "#e63946", marginBottom: 12 }}>FAQ</span>
              <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, marginBottom: 8 }}>Frequently Asked <span style={{ color: "#e63946", fontStyle: "italic" }}>Questions</span></h2>
              <p style={{ color: "#6b7280", marginBottom: 32, fontSize: ".95rem" }}>Can't find an answer? Send us a message and we'll help.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", transition: "box-shadow .2s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.07)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", padding: "18px 20px", background: openFaq === i ? "#fff9f9" : "#fff", border: "none", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <span style={{ fontWeight: 700, fontSize: ".95rem", color: openFaq === i ? "#e63946" : "#111" }}>{faq.q}</span>
                      <span style={{ fontSize: "1.2rem", color: "#6b7280", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform .2s", fontWeight: 300 }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "4px 20px 18px", color: "#4b5563", fontSize: ".9rem", lineHeight: 1.7, background: "#fff9f9" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ marginTop: 40, height: 200, background: "linear-gradient(135deg, #111 0%, #2d2d2d 100%)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: "2.5rem" }}>📍</span>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#fff", fontWeight: 700 }}>123 Sole Street, San Francisco</div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: ".85rem" }}>Mon–Sat 9am–7pm · Sun 11am–5pm</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media(max-width:860px){ .contact-main{grid-template-columns:1fr!important} .info-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:500px){ .info-grid{grid-template-columns:1fr!important} .form-row{grid-template-columns:1fr!important} }
      `}</style>
    </div>
  );
}
