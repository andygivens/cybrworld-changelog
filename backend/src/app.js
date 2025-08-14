const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./db');
const updateRoutes = require('./routes/updateRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/updates', updateRoutes);
app.use('/media', mediaRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
