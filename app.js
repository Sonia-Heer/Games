const express = require('express');
const app = express();
const connection = require('./db/connection')
const { getCategories, getAllEndpoints } = require('./Controllers/controllers');


app.get('/api/categories', getCategories);

app.get('/api', getAllEndpoints)

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
  });

module.exports = app;