import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const faqs = [
  { q: "How do I place an order?", a: "Browse our shop, select your size and colour, then click 'Add to Cart'. When ready, go to Cart and click Checkout. Fill in your delivery details and payment info to complete the order." },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Apple Pay, PayPal, and Cash on Delivery (COD) for orders within Pakistan." },
  { q: "Do you offer Cash on Delivery (COD)?", a: "Yes! COD is available for all cities across Pakistan. Simply select COD at checkout." },
  { q: "How long does delivery take?", a: "Express delivery (major cities): 1–2 business days. Standard delivery: 3–5 business days. You'll receive an SMS with tracking details once dispatched." },
  { q: "Is delivery free?", a: "Yes! Orders above Rs. 21,000 get free standard delivery. For orders below this, delivery charges are Rs. 199 (standard) or Rs. 399 (express)." },
  { q: "Can I return or exchange my shoes?", a: "Absolutely. We offer 30-day hassle-free returns and exchanges for unworn shoes in original packaging. We arrange free pickup from your door." },
  { q: "How do I know my correct shoe size?", a: "Check our Size Guide page for detailed UK/US/EU size charts and foot measurement instructions. When between sizes, we recommend going up half a size." },
  { q: "Are your products 100% authentic?", a: "Yes, every product sold on SOLE is 100% genuine and sourced directly from authorized distributors. We provide a certificate of authenticity with limited edition shoes." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement by contacting us on WhatsApp (+92 300 1234567). After dispatch, you'll need to follow the return process." },
  { q: "Do you ship outside Pakistan?", a: "Currently we only ship within Pakistan. International shipping is coming soon — sign up for our newsletter to be notified." },
];

export default function FAQ() {
  const { bg, card, text, textMuted, border, isDark } = useTheme();
  useEffect(() => { document.title = "FAQ — SOLE."; }, []);
  const [open, setOpen] = useState(null);

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>FAQ</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>❓</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Frequently Asked Questions</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>Everything you need to know about SOLE</p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "52px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${open === i ? "#e63946" : border}`, borderRadius: 16, overflow: "hidden", transition: "border-color .2s" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                <span style={{ fontWeight: 700, fontSize: ".96rem", color: text }}>{faq.q}</span>
                <span style={{ fontSize: "1.2rem", color: "#e63946", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .25s" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", fontSize: ".92rem", color: textMuted, lineHeight: 1.75, borderTop: `1px solid ${border}`, paddingTop: 16 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center", padding: 32, background: card, border: `1px solid ${border}`, borderRadius: 20 }}>
          <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>💬</div>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Still have questions?</h3>
          <p style={{ color: textMuted, marginBottom: 20, fontSize: ".9rem" }}>Our team is available Mon–Sat, 9am–6pm PKT</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ padding: "11px 24px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>Contact Us</Link>
            <a href="https://wa.me/923001234567" style={{ padding: "11px 24px", background: "#25D366", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
