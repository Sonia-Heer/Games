const { fetchCategories } = require("../Models/models");

exports.getCategories = (req, res) => {
    fetchCategories()
     .then((categories) => {
        res.status(200).send(categories);
    });   
};