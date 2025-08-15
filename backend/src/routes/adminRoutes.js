const express = require('express');
const router = express.Router();

// POST /admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password not configured.' });
  }
  if (password === adminPassword) {
    // For MVP, just return success (no JWT/session)
    return res.json({ success: true });
  }
  return res.status(401).json({ error: 'Invalid password.' });
});

module.exports = router;
