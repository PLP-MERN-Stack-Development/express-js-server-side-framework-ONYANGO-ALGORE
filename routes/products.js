const express = require('express');

const router = express.Router();

const {
  listProducts,
  searchProducts,
  getProductStats,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authenticationMiddleware = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');
const { asyncHandler } = require('../utils/errors');

router.get('/', asyncHandler(listProducts));
router.get('/search', asyncHandler(searchProducts));
router.get('/stats', asyncHandler(getProductStats));
router.get('/:id', asyncHandler(getProductById));
router.post('/', authenticationMiddleware, validateProduct(true), asyncHandler(createProduct));
router.put('/:id', authenticationMiddleware, validateProduct(false), asyncHandler(updateProduct));
router.delete('/:id', authenticationMiddleware, asyncHandler(deleteProduct));

module.exports = router;

