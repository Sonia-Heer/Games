const { fetchCategories } = require("../Models/models");
const endpoints = require('../endpoints.json');

exports.getCategories = (req, res) => {
    fetchCategories()
     .then((categories) => {
        res.status(200).send(categories);
    });   
};

exports.getAllEndpoints = (req, res) => {
    res.status(200).send(endpoints);
};