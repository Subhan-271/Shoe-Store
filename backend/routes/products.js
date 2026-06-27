const express = require("express");
const router  = express.Router();
const db      = require("../db");

/* helper — parse JSON columns that come back as strings */
function parseProduct(p) {
  return {
    ...p,
    shoeType:   p.shoe_type,
    shoeColors: typeof p.shoe_colors === "string" ? JSON.parse(p.shoe_colors) : (p.shoe_colors || []),
    features:   typeof p.features    === "string" ? JSON.parse(p.features)    : (p.features    || []),
    sizes:      typeof p.sizes       === "string" ? JSON.parse(p.sizes)       : (p.sizes       || []),
    colors:     typeof p.colors      === "string" ? JSON.parse(p.colors)      : (p.colors      || []),
    originalPrice: Number(p.original_price),
    price:         Number(p.price),
    rating:        Number(p.rating),
  };
}

/* GET /api/products
   Query params: category, search, maxPrice, onlySale, sort */
router.get("/", async (req, res) => {
  try {
    const { category, search, maxPrice, onlySale, sort } = req.query;

    let sql    = "SELECT * FROM products WHERE 1=1";
    const args = [];

    if (category) {
      sql += " AND category = ?";
      args.push(category);
    }
    if (search) {
      sql += " AND (name LIKE ? OR category LIKE ?)";
      args.push(`%${search}%`, `%${search}%`);
    }
    if (maxPrice) {
      sql += " AND price <= ?";
      args.push(Number(maxPrice));
    }
    if (onlySale === "true") {
      sql += " AND price < original_price";
    }

    const sortMap = {
      "price-asc":  "price ASC",
      "price-desc": "price DESC",
      "rating":     "rating DESC",
      "newest":     "id DESC",
    };
    sql += ` ORDER BY ${sortMap[sort] || "id ASC"}`;

    const [rows] = await db.query(sql, args);
    res.json(rows.map(parseProduct));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

/* GET /api/products/:id */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(parseProduct(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
