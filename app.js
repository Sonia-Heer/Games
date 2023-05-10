const express = require('express');
const app = express();
const connection = ('./db/connection')
const { getCategories } = require('./Controllers/controllers');

app.get('/api/categories', getCategories);

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
  });

module.exports = app;