const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');
const { requireAdmin } = require('../middleware/rbac');

router.get('/', updateController.listUpdates);
router.get('/:id', updateController.getUpdate);
router.post('/', requireAdmin, updateController.createUpdate);
router.put('/:id', requireAdmin, updateController.editUpdate);
router.delete('/:id', requireAdmin, updateController.deleteUpdate);

module.exports = router;
