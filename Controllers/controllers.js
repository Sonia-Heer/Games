const { fetchCategories } = require("../Models/models");
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