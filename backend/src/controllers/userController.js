const bcrypt = require('bcrypt');
const { sequelize } = require('../db');
const User = require('../models/user')(sequelize);

// For MVP, mock SSO user
const getCurrentUser = async (req, res) => {
  // In production, extract user from SSO/JWT
  const mockUser = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Demo Author',
    email: 'author@cybrworld.com',
    role: 'author',
    ssoId: 'mock-sso-id',
  };
  res.json(mockUser);
};

const userController = {
  // List all users
  async list(req, res) {
    const users = await User.findAll();
    res.json(users);
  },

  // Get user by ID
  async get(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  },

  // Create user
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const hash = password ? await bcrypt.hash(password, 10) : null;
      const user = await User.create({ name, email, password: hash, role });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update user
  async update(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (password) user.password = await bcrypt.hash(password, 10);
      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete user
  async remove(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ success: true });
  },
};

module.exports = { userController, getCurrentUser };
