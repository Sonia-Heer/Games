const { fetchCategories, selectReviewsById } = require("../Models/models");
const endpoints = require('../endpoints.json');

exports.getCategories = (req, res, next) => {
    fetchCategories()
     .then((categories) => {
        res.status(200).send(categories);  
    })
    .catch((err) => {
        next(err)
    }); 
};

exports.getAllEndpoints = (req, res) => {
    res.status(200).send({ endpoints: endpoints });
};

exports.getReviewsByID = (req, res, next) => {
    const review_id = req.params.review_id;
    selectReviewsById(review_id)
        .then((review) => {
            res.status(200).send({ review: review })
        })
        .catch((err) => {
            next(err)
        }); 
};