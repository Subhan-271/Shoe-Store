/* SVG shoe illustrations — used when no photo is provided */

function Sneaker({ c1, c2, c3 }) {
  return (
    <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", maxWidth: 280, filter: "drop-shadow(0 12px 28px rgba(0,0,0,.35))" }}>
      {/* Shadow */}
      <ellipse cx="168" cy="158" rx="118" ry="9" fill="rgba(0,0,0,.25)" />

      {/* Outer sole — thick dark band */}
      <path d="M 55 118 C 52 132 65 140 82 140 L 252 140 C 272 140 278 130 276 118 L 276 110 L 55 110 Z" fill="#1a1a1a" />

      {/* Midsole — white cushion strip */}
      <rect x="53" y="102" width="224" height="10" rx="5" fill="#f0f0f0" />

      {/* Heel (left, slightly darker) */}
      <path d="M 53 102 C 48 82 50 55 66 38 C 78 25 98 18 118 16 L 118 102 Z" fill={c2} />

      {/* Main upper body */}
      <path d="M 115 16 L 228 14 C 258 14 272 36 274 68 C 276 84 276 102 276 102 L 53 102 Z" fill={c1} />

      {/* Toe box (right, slightly darker) */}
      <path d="M 232 14 C 262 16 274 46 275 78 L 276 102 L 254 102 C 252 82 246 56 232 38 C 222 25 228 15 232 14 Z" fill={c2} />

      {/* Tongue */}
      <rect x="114" y="14" width="16" height="88" rx="8" fill={c3} />

      {/* Ankle collar ring */}
      <path d="M 53 102 C 48 82 50 55 66 38 C 74 29 86 22 100 18" fill="none" stroke={c3} strokeWidth="14" strokeLinecap="round" />
      <path d="M 53 102 C 48 82 50 55 66 38 C 74 29 86 22 100 18" fill="none" stroke={c2} strokeWidth="8" strokeLinecap="round" />

      {/* Laces */}
      {[28, 44, 60, 76].map((y, i) => (
        <line key={i} x1="130" y1={y} x2={210 + i * 3} y2={y - 3} stroke="rgba(255,255,255,.85)" strokeWidth="2.5" strokeLinecap="round" />
      ))}

      {/* Side stripe / swoosh */}
      <path d="M 135 72 C 168 58 208 62 238 76 C 210 70 172 70 135 72 Z" fill="rgba(255,255,255,.2)" />

      {/* Heel logo dot */}
      <circle cx="80" cy="72" r="8" fill="rgba(255,255,255,.15)" />
    </svg>
  );
}

function Boot({ c1, c2, c3 }) {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", maxWidth: 260, filter: "drop-shadow(0 12px 28px rgba(0,0,0,.35))" }}>
      {/* Shadow */}
      <ellipse cx="168" cy="190" rx="105" ry="8" fill="rgba(0,0,0,.25)" />

      {/* Thick outsole */}
      <path d="M 62 148 C 58 165 72 172 90 172 L 252 172 C 274 172 278 160 276 148 L 276 140 L 62 140 Z" fill="#1a1a1a" />

      {/* Rubber rand (edge around sole) */}
      <rect x="60" y="132" width="218" height="10" rx="5" fill="#2d2d2d" />

      {/* Boot shaft — tall upper */}
      <rect x="62" y="28" width="68" height="106" rx="6" fill={c2} />

      {/* Main boot foot area */}
      <path d="M 60 132 C 56 110 58 90 62 80 L 62 28 L 130 28 L 130 132 Z" fill={c2} />
      <path d="M 128 28 L 236 28 C 260 28 274 48 274 78 C 275 96 276 132 276 132 L 60 132 Z" fill={c1} />

      {/* Boot toe (darker) */}
      <path d="M 238 28 C 264 30 275 56 276 88 L 276 132 L 256 132 C 255 108 248 80 234 60 C 224 46 230 29 238 28 Z" fill={c2} />

      {/* Ankle eyelets + lacing */}
      {[44, 60, 76, 92, 108].map((y, i) => (
        <g key={i}>
          <circle cx="138" cy={y} r="4" fill={c3} stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="122" cy={y} r="4" fill={c3} stroke="#1a1a1a" strokeWidth="1.5" />
          <line x1="126" y1={y} x2="134" y2={y} stroke="#d4a017" strokeWidth="2" />
        </g>
      ))}
      {/* Lace crisscross */}
      {[52, 68, 84, 100].map((y, i) => (
        <line key={i} x1="122" y1={y} x2="138" y2={y + 16} stroke="#d4a017" strokeWidth="1.5" opacity="0.8" />
      ))}

      {/* Collar padding */}
      <ellipse cx="96" cy="28" rx="34" ry="10" fill={c3} opacity="0.8" />

      {/* Side logo */}
      <text x="158" y="95" fill="rgba(255,255,255,.2)" fontSize="28" fontWeight="900" fontFamily="system-ui">X3</text>
    </svg>
  );
}

function Oxford({ c1, c2, c3 }) {
  return (
    <svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", maxWidth: 280, filter: "drop-shadow(0 12px 28px rgba(0,0,0,.35))" }}>
      {/* Shadow */}
      <ellipse cx="165" cy="140" rx="115" ry="8" fill="rgba(0,0,0,.25)" />

      {/* Thin leather sole */}
      <path d="M 48 112 C 45 126 62 132 82 132 L 255 132 C 272 132 276 122 274 112 L 274 106 L 48 106 Z" fill="#111" />

      {/* Welt stitch line */}
      <path d="M 50 106 L 272 106" stroke="#5a3e1b" strokeWidth="2" strokeDasharray="6 4" />

      {/* Heel block */}
      <path d="M 48 106 C 44 90 46 68 56 52 C 64 40 80 34 100 32 L 100 106 Z" fill={c2} />

      {/* Vamp (main body) */}
      <path d="M 98 32 L 220 30 C 250 30 266 50 268 74 C 270 88 272 106 272 106 L 48 106 Z" fill={c1} />

      {/* Toe cap (brogue wing tip style) */}
      <path d="M 216 30 C 248 32 266 56 270 84 L 272 106 L 252 106 C 250 88 244 66 230 50 C 222 40 216 31 216 30 Z" fill={c2} />
      <path d="M 220 32 C 246 36 262 60 266 88" fill="none" stroke={c3} strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Quarter panel seam */}
      <path d="M 148 30 L 152 106" stroke={c2} strokeWidth="2" opacity="0.6" />

      {/* Brogue perforations on toe cap */}
      {[240, 252, 264].map((x, i) => (
        [50, 60, 70].map((y, j) => (
          <circle key={`${i}${j}`} cx={x - j * 6 + i * 4} cy={y} r="1.8" fill={c2} stroke={c3} strokeWidth="0.8" />
        ))
      ))}

      {/* Heel logo badge */}
      <rect x="60" y="72" width="30" height="20" rx="4" fill="rgba(255,255,255,.1)" />

      {/* Ankle opening */}
      <path d="M 48 106 C 44 88 46 68 56 52" fill="none" stroke={c3} strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

/* ── Main export ── */
export default function ShoeIllustration({ shoeType = "sneaker", colors = [] }) {
  // pick 3 tones: main, dark, light
  const c1 = colors[0] || "#e63946";
  const c2 = colors[1] || darkenHex(c1, 30);
  const c3 = colors[2] || lightenHex(c1, 40);

  if (shoeType === "boot")   return <Boot   c1={c1} c2={c2} c3={c3} />;
  if (shoeType === "oxford") return <Oxford c1={c1} c2={c2} c3={c3} />;
  return <Sneaker c1={c1} c2={c2} c3={c3} />;
}

/* ── color helpers ── */
function darkenHex(hex, amount = 30) {
  try {
    let [r, g, b] = hexToRgb(hex);
    return `rgb(${Math.max(0,r-amount)},${Math.max(0,g-amount)},${Math.max(0,b-amount)})`;
  } catch { return "#333"; }
}
function lightenHex(hex, amount = 40) {
  try {
    let [r, g, b] = hexToRgb(hex);
    return `rgb(${Math.min(255,r+amount)},${Math.min(255,g+amount)},${Math.min(255,b+amount)})`;
  } catch { return "#999"; }
}
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  return [
    parseInt(full.slice(0,2), 16),
    parseInt(full.slice(2,4), 16),
    parseInt(full.slice(4,6), 16),
  ];
}
