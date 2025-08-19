const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../db');
const User = require('../models/user')(sequelize);

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-secret';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !user.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Issue JWT
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
};
