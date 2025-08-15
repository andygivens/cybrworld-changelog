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

const app = express();
app.use(bodyParser.json());

// Log each request to stdout
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/updates', updateRoutes);
app.use('/media', mediaRoutes);
app.use('/users', userRoutes);
app.use('/author', authorRoutes);
app.use('/tags', tagsRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
