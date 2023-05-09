const express = require('express');
const app = express();
const connection = ('./db/connection')
const { getCategories } = require('./Controllers/controllers');

app.get('/api/categories', getCategories);

module.exports = app;