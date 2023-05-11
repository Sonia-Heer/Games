const express = require('express');
const app = express();
const connection = require('./db/connection')
const { getCategories, getAllEndpoints, getReviews, getReviewsByID } = require('./Controllers/controllers');


app.get('/api/categories', getCategories);

app.get('/api', getAllEndpoints);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewsByID)

app.use((err, req, res, next) => {
    if(err.code === "22P02"){
        res.status(400).send({ msg: "bad request"})
    }else{
        next(err);
    };
})

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({ msg: err.msg})
    }else{
        next(err);
    };
  });

  app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
  });

module.exports = app;