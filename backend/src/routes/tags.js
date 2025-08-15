const express = require('express');
const router = express.Router();
const { Update } = require('../models');

// GET /tags - return all unique tags from updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.findAll({ attributes: ['tags'] });
    // Flatten and deduplicate tags
    let allTags = [];
    updates.forEach(update => {
      if (Array.isArray(update.tags)) {
        allTags.push(...update.tags);
      } else if (typeof update.tags === 'string') {
        allTags.push(...update.tags.split(',').map(t => t.trim()));
      }
    });
    const uniqueTags = Array.from(new Set(allTags)).filter(Boolean);
    res.json(uniqueTags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

module.exports = router;
