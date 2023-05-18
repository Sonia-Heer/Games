
const { fetchCategories, fetchReviews, selectReviewsById, fetchReviewIdComments, createComment} = require("../Models/models")

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


exports.postComment = (req, res, next) => {
    const { review_id } = req.params;
    const { username, body } = req.body;
   
    createComment(review_id, username, body)
        .then((comment) => {
            res.status(201).send({ newComment: comment})
        })
        .catch((err) => {
            next(err)
        }); 
    
}

exports.getReviewIdComments = (req, res, next) => {
    const { review_id } = req.params;
    fetchReviewIdComments(review_id)
        .then((comments) => {
            res.status(200).send({ comments: comments })
        })
        .catch((err) => {
            next(err)
        });
};


