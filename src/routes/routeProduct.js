const express = require('express');
const { getListAllProducts, getListBannerProducts, searchProducts, searchProductsByName, getProductById } = require('../controllers/product');
const routeProduct = express.Router();


routeProduct.get('/getallproducts', getListAllProducts);
routeProduct.get('/getbannerproducts', getListBannerProducts);
routeProduct.get('/searchproducts', searchProducts);
routeProduct.get('/searchproductsbyname/:name', searchProductsByName);
routeProduct.get('/getproductsbyid/:productId', getProductById);



module.exports = routeProduct