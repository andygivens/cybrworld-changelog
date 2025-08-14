const { sequelize } = require('../db');
const Update = require('../models/update')(sequelize);
const Media = require('../models/media')(sequelize);

exports.listUpdates = async (req, res) => {
  try {
    const updates = await Update.findAll({ include: [Media] });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
};

exports.getUpdate = async (req, res) => {
  try {
    const update = await Update.findByPk(req.params.id, { include: [Media] });
    if (!update) return res.status(404).json({ error: 'Update not found' });
    res.json(update);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch update' });
  }
};

exports.createUpdate = async (req, res) => {
  try {
    const update = await Update.create(req.body);
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create update' });
  }
};

exports.editUpdate = async (req, res) => {
  try {
    const update = await Update.findByPk(req.params.id);
    if (!update) return res.status(404).json({ error: 'Update not found' });
    await update.update(req.body);
    res.json(update);
  } catch (err) {
    res.status(400).json({ error: 'Failed to edit update' });
  }
};

exports.deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findByPk(req.params.id);
    if (!update) return res.status(404).json({ error: 'Update not found' });
    await update.destroy();
    res.json({ message: 'Update deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete update' });
  }
};
