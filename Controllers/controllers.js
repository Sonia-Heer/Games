const { fetchCategories, fetchReviews } = require("../Models/models");
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

exports.getReviews = (req, res, next) => {
    const { sort_by, order} = req.query;
    fetchReviews(sort_by, order)
    .then((reviews) => {
        res.status(200).send({ reviews: reviews })
    })
    .catch((err) => {
        next(err)
    });
};