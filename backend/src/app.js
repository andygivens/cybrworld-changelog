const express = require('express');
const bodyParser = require('body-parser');

const { sequelize, Update, Media } = require('./models');

// Set up associations
Update.hasMany(Media, { foreignKey: 'updateId' });
Media.belongsTo(Update, { foreignKey: 'updateId' });

const updateRoutes = require('./routes/updateRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');
const tagsRoutes = require('./routes/tags');

const morgan = require('morgan');
const AWS = require('aws-sdk');

const app = express();
app.use(bodyParser.json());

// Log each request to stdout
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/updates', updateRoutes);
app.use('/media', mediaRoutes);
app.use('/users', userRoutes);
app.use('/author', authorRoutes);
app.use('/tags', tagsRoutes);

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

async function ensureBucketExists(bucketName) {
  try {
  await s3.headBucket({ Bucket: bucketName }).promise();
  console.log(`[MINIO] Bucket '${bucketName}' already exists.`);
  } catch (err) {
    if (err.statusCode === 404) {
  await s3.createBucket({ Bucket: bucketName }).promise();
  console.log(`[MINIO] Bucket '${bucketName}' created.`);
    } else {
  console.error('[MINIO] Error checking/creating bucket:', err);
    }
  }
}

const PORT = process.env.PORT || 4000;

sequelize.sync().then(async () => {
  if (process.env.S3_BUCKET) {
    await ensureBucketExists(process.env.S3_BUCKET);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
