const express = require('express');
const { getListProductByCategory } = require('../controllers/category');

const routeCategory = express.Router();


routeCategory.post('/getproductbycategory', getListProductByCategory);





module.exports = routeCategory