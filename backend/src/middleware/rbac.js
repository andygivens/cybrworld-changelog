// For MVP, mock RBAC middleware
exports.requireAdmin = (req, res, next) => {
  // In production, check JWT/SSO and user role
  // For MVP, allow all requests as admin
  req.user = {
    id: '00000000-0000-0000-0000-000000000001',
    role: 'admin',
  };
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
