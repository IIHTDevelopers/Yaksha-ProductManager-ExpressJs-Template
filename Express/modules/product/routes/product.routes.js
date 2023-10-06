const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product.controller');
const productController = new ProductController();

router.get('/all', productController.getAllProducts);
router.post('/create', productController.createProduct);
router.get('/search', productController.searchProduct);
router.get('/top-rated/:limit', productController.getTopRatedProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
