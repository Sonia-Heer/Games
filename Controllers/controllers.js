const { fetchCategories } = require("../Models/models");

exports.getCategories = (req, res, next) => {
    fetchCategories()
     .then((categories) => {
        if (categories.length === 0) {
        return res.status(404).send({ msg: "No categories found" });
        } 
        return res.status(200).send(categories);
    })
    .catch((err) => {
        next(err)
    }); 
};