const connection = require('../db/connection');

exports.fetchCategories = () => {
    return connection
        .query(`SELECT slug, description FROM categories;`)
            .then((results) => {
                return results.rows;
            });
};

exports.fetchReviews = (sort_by = 'created_at', order = 'asc') => {
    const validSortQueries = ['created_at', 'owner', 'title', 'category', 'votes', 'comment_count'];
    const validOrderQueries = ['asc', 'desc'];
    if(!validSortQueries.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Invalid sort query' });
    };
    if(!validOrderQueries.includes(order)){
        return Promise.reject({status: 400, msg: 'invalid order query' })
    }
    return connection
        .query(`SELECT reviews.review_id, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id)::int AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer ORDER BY ${sort_by} ${order};`)
        .then((results) => {
            return results.rows;
        });
};

exports.selectReviewsById = (review_id) => {
    return connection.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
        .then((results) => {
            if(results.rows.length === 0){
                return Promise.reject({ status: 404, msg: "Not found"})
            }
            return results.rows[0]
        })
};

const checkReviewExists = (review_id) => {
    return connection.query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
    .then((results) => {
        if(results.rows.length === 0){
            return false;
        }else{
            return true;
        };
    });
};

const checkUsernameExists = (username) => {
    return connection.query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((results) => {
        if(results.rows.length === 0){
            return false;
        }else{
            return true;
        };
    });
}
    
exports.createComment = (review_id, username, body) => {
    return Promise.all([checkReviewExists(review_id), checkUsernameExists(username)])
        .then((reviewExists, usernameExists) => {
            if(reviewExists && usernameExists){
                return connection.query(`INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;`, [username, body, review_id])
                .then((results) => {
                    return results.rows
                })
            }else{
                return Promise.reject({ status: 404, msg: 'Review or username not found' })
            }
        });
};