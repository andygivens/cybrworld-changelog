const { sequelize } = require('../db');
const User = require('../models/user')(sequelize);

// For MVP, mock SSO user
exports.getCurrentUser = async (req, res) => {
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
