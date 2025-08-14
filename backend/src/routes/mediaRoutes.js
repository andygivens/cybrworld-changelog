const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { requireAdmin } = require('../middleware/rbac');

router.post('/', requireAdmin, mediaController.uploadMedia);
router.get('/:id', mediaController.getMedia);

module.exports = router;
