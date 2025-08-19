const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/user')(sequelize);

async function seedUsers() {
  const passwordHash = await bcrypt.hash('changeme', 10);
  const users = [
    { name: 'User One', email: 'user1@local', password: passwordHash, role: 'user' },
    { name: 'Author One', email: 'author1@local', password: passwordHash, role: 'author' },
    { name: 'Admin One', email: 'admin1@local', password: passwordHash, role: 'admin' },
  ];
  for (const user of users) {
    await User.findOrCreate({ where: { email: user.email }, defaults: user });
  }
  console.log('Seeded local users.');
}

seedUsers().then(() => process.exit(0));
