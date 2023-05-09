const connection = require('../db/connection');

exports.fetchCategories = () => {
    return connection
        .query(`SELECT slug, description FROM categories;`)
            .then((results) => {
                return results.rows;
            });
};