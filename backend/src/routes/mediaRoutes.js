const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { requireAdmin } = require('../middleware/rbac');

router.post('/', requireAdmin, mediaController.uploadMedia);
router.get('/:id', mediaController.getMedia);


// Error-handling middleware for Multer and other upload errors
router.use((err, req, res, next) => {
	console.error('Media upload error:', err);
	if (err.name === 'MulterError') {
		// Multer-specific errors
		return res.status(400).json({ error: 'Multer error', details: err.message });
	}
	// Other errors
	res.status(500).json({ error: 'Upload failed', details: err.message || err });
});

module.exports = router;
