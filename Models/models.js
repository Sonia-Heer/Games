const connection = require('../db/connection');

exports.fetchCategories = () => {
    return connection
        .query(`SELECT slug, description FROM categories;`)
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

