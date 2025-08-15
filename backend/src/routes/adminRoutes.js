const express = require('express');
const router = express.Router();

// POST /author/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const authorPassword = process.env.AUTHOR_PASSWORD;
  if (!authorPassword) {
    return res.status(500).json({ error: 'Author password not configured.' });
  }
  if (password === authorPassword) {
    // For MVP, just return success (no JWT/session)
    return res.json({ success: true });
  }
  return res.status(401).json({ error: 'Invalid password.' });
});

module.exports = router;
