import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { pkr } from "../utils/currency";

const amounts = [2000, 5000, 10000, 15000, 25000, 50000];

export default function GiftCards() {
  const { bg, bg2, card, text, textMuted, border, inputBg } = useTheme();
  useEffect(() => { document.title = "Gift Cards — SOLE."; }, []);

  const [selected, setSelected] = useState(5000);
  const [custom, setCustom]     = useState("");
  const [sent, setSent]         = useState(false);
  const [form, setForm]         = useState({ recipient: "", email: "", message: "" });

  const finalAmt = custom ? Number(custom) : selected;

  function handleSend(e) {
    e.preventDefault();
    if (!form.recipient || !form.email) return;
    setSent(true);
  }

  if (sent) return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif", padding: 24 }}>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 24, padding: "56px 40px", textAlign: "center", maxWidth: 460 }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎁</div>
        <h2 style={{ fontWeight: 900, color: text, marginBottom: 10 }}>Gift Card Sent!</h2>
        <p style={{ color: textMuted, marginBottom: 6 }}>A <strong style={{ color: "#e63946" }}>{pkr(finalAmt)}</strong> gift card has been sent to <strong style={{ color: text }}>{form.email}</strong></p>
        <p style={{ color: textMuted, fontSize: ".85rem", marginBottom: 28 }}>The recipient can use it on their next order at SOLE.</p>
        <Link to="/shop" style={{ padding: "12px 28px", background: "#e63946", color: "#fff", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>Continue Shopping</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#111", padding: "52px 0", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontSize: ".85rem", color: "rgba(255,255,255,.45)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</Link>
          <span>›</span><span>Gift Cards</span>
        </div>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎁</div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 8 }}>Gift Cards</h1>
        <p style={{ color: "rgba(255,255,255,.55)" }}>The perfect gift for every shoe lover</p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }} className="gift-wrap">

        {/* Left — preview card */}
        <div>
          <div style={{ background: "linear-gradient(135deg,#111 0%,#e63946 100%)", borderRadius: 20, padding: "40px 32px", color: "#fff", marginBottom: 24, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "1.4rem", fontWeight: 800 }}>
              <span>👟</span> SOLE<span style={{ color: "#ffd6d6" }}>.</span>
            </div>
            <div>
              <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Gift Card Value</div>
              <div style={{ fontSize: "2.2rem", fontWeight: 900 }}>{pkr(finalAmt || 0)}</div>
              {form.recipient && <div style={{ fontSize: ".85rem", marginTop: 8, color: "rgba(255,255,255,.8)" }}>For: {form.recipient}</div>}
            </div>
          </div>

          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>How it works</h3>
            {["Buy a gift card for any amount","Recipient gets it via email instantly","They use the code at checkout","Valid for 1 year from purchase"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: ".88rem", color: textMuted }}>
                <span style={{ color: "#e63946", fontWeight: 700 }}>{i + 1}.</span>{s}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSend} style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 28 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 20 }}>Choose Amount</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
            {amounts.map(a => (
              <button key={a} type="button" onClick={() => { setSelected(a); setCustom(""); }}
                style={{ padding: "10px 4px", border: `2px solid ${selected === a && !custom ? "#e63946" : border}`, borderRadius: 10, background: selected === a && !custom ? "rgba(230,57,70,.08)" : "transparent", color: selected === a && !custom ? "#e63946" : text, fontWeight: 700, fontSize: ".85rem", cursor: "pointer" }}>
                {pkr(a)}
              </button>
            ))}
          </div>
          <input type="number" placeholder="Or enter custom amount (PKR)"
            value={custom} onChange={e => { setCustom(e.target.value); setSelected(null); }}
            style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${border}`, borderRadius: 10, fontSize: ".9rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box", marginBottom: 20 }} />

          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 16 }}>Recipient Details</h2>
          {[["recipient","Recipient Name","Muhammad Ali"],["email","Email Address","ali@example.com"]].map(([f, label, ph]) => (
            <div key={f} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: ".78rem", fontWeight: 700, color: textMuted, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>{label}</label>
              <input type={f === "email" ? "email" : "text"} placeholder={ph}
                value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                required
                style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${border}`, borderRadius: 10, fontSize: ".9rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: ".78rem", fontWeight: 700, color: textMuted, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Personal Message (optional)</label>
            <textarea placeholder="Happy Birthday! Enjoy some new kicks 👟" rows={3}
              value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${border}`, borderRadius: 10, fontSize: ".9rem", background: inputBg, color: text, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
          </div>

          <button type="submit"
            style={{ width: "100%", padding: "14px", background: "#e63946", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>
            Send Gift Card · {pkr(finalAmt || 0)}
          </button>
        </form>
      </div>
      <style>{`@media(max-width:700px){ .gift-wrap{ grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
