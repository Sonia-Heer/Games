const { fetchCategories } = require("../Models/models");

exports.getCategories = (req, res, next) => {
    fetchCategories()
     .then((categories) => {
        return res.status(200).send(categories);
    })
    .catch((err) => {
        next(err)
    }); 
};