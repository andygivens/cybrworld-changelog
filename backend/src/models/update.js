const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Update = sequelize.define('Update', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    links: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Update;
};
