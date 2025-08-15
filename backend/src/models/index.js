const { sequelize } = require('../db');
const Update = require('./update')(sequelize);
const Media = require('./media')(sequelize);

// Set up associations
Update.hasMany(Media, { foreignKey: 'updateId' });
Media.belongsTo(Update, { foreignKey: 'updateId' });

module.exports = {
  Update,
  Media,
  sequelize,
};
