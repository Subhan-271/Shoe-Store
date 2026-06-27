require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const db      = require("./db");

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* ── Routes ── */
app.use("/api/products",   require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/contact",    require("./routes/contact"));

/* ── Health check ── */
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", db: "connected", time: new Date().toISOString() });
  } catch {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

/* ── 404 ── */
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`\n✅  SOLE API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Products: http://localhost:${PORT}/api/products\n`);
});
