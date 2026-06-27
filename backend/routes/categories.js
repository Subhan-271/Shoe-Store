const express = require("express");
const router  = express.Router();
const db      = require("../db");

/* GET /api/categories — with live product count */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.name, c.emoji, COUNT(p.id) AS count
      FROM categories c
      LEFT JOIN products p ON p.category = c.id
      GROUP BY c.id, c.name, c.emoji, c.sort_order
      ORDER BY c.sort_order
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
