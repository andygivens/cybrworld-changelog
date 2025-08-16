const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * Author login route
 * POST /author/login
 * Expects: { password: string }
 * Checks password against AUTHOR_PASSWORD env variable
* Returns: { success: true, token: <JWT> } if correct, 401 otherwise
* Token expires in 15 minutes
 */
router.post('/login', (req, res) => {
  console.log(`[LOGIN] ${req.method} ${req.originalUrl} body:`, req.body);
  const { password } = req.body;
  const authorPassword = process.env.AUTHOR_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
  if (!authorPassword) {
    return res.status(500).json({ error: 'Author password not configured.' });
  }
  if (password === authorPassword) {
    // Issue JWT token valid for 15 minutes
    const token = jwt.sign({ role: 'author' }, jwtSecret, { expiresIn: '15m' });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ error: 'Invalid password.' });
});

module.exports = router;
