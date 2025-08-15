const express = require('express');
const router = express.Router();

/**
 * Author login route
 * POST /author/login
 * Expects: { password: string }
 * Checks password against AUTHOR_PASSWORD env variable
 * Returns: { success: true } if correct, 401 otherwise
 * Note: No JWT/session implemented (MVP only)
 */
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
