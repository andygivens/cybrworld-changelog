const { sequelize } = require('../db');
const Media = require('../models/media')(sequelize);
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

exports.uploadMedia = [
  upload.single('file'),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'Multer error', details: err.message });
    }
    next();
  },
  async (req, res) => {
    try {
      console.log('req.file:', req.file);
      console.log('req.body:', req.body);
      if (!req.file) {
        console.error('No file received:', req.body);
        return res.status(400).json({ error: 'No file received', details: req.body });
      }
      if (!req.body.updateId) {
        console.error('No updateId provided:', req.body);
        return res.status(400).json({ error: 'No updateId provided', details: req.body });
      }
      const media = await Media.create({
        url: req.file.location,
        type: req.file.mimetype,
        updateId: req.body.updateId,
      });
      res.status(201).json(media);
    } catch (err) {
      console.error('Upload error:', err);
      res.status(400).json({ error: 'Failed to upload media', details: err.message, stack: err.stack });
    }
  },
];

exports.getMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};
