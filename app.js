const express = require('express');
const app = express();
const connection = require('./db/connection')
const { getCategories, getAllEndpoints, getReviews, getReviewsByID, postComment } = require('./Controllers/controllers');

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api', getAllEndpoints);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewsByID);

app.post('/api/reviews/:review_id/comments', postComment);

app.use((err, req, res, next) => {
    if(err.code === "22P02"){
        res.status(400).send({ msg: "bad request"})
    }else if(err.code === '23503'){
        res.status(404).send({ msg: "Not found"})
    }else{
        next(err)
    }
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