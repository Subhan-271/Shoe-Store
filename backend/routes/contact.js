const express = require("express");
const router  = express.Router();
const db      = require("../db");

/* POST /api/contact */
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    await db.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim(), subject || "General Inquiry", message.trim()]
    );
    res.json({ success: true, message: "Message received! We'll reply within 24 hours." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message." });
  }
});

/* POST /api/newsletter */
router.post("/newsletter", async (req, res) => {
  const { email } = req.body;
  if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Valid email required." });
  }
  try {
    await db.query(
      "INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)",
      [email.trim()]
    );
    res.json({ success: true, message: "You're subscribed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Subscription failed." });
  }
});

module.exports = router;
