const { sequelize } = require('../db');
const User = require('../models/user')(sequelize);

// For MVP, mock SSO user
exports.getCurrentUser = async (req, res) => {
  // In production, extract user from SSO/JWT
  const mockUser = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Demo Admin',
    email: 'admin@cybrworld.com',
    role: 'admin',
    ssoId: 'mock-sso-id',
  };
  res.json(mockUser);
};
