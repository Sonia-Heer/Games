const express = require('express');
const app = express();
const connection = require('./db/connection')
const { getCategories, getAllEndpoints } = require('./Controllers/controllers');


app.get('/api/categories', getCategories);

app.get('/api', getAllEndpoints)

module.exports = app;