// server.js - Express server for Week 2 assignment
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const loggerMiddleware = require('./middleware/logger');
const productRoutes = require('./routes/products');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;