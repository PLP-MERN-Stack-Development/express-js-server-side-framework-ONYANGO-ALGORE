const { v4: uuidv4 } = require('uuid');
const { products } = require('../data/products');
const { NotFoundError, ValidationError } = require('../utils/errors');

const listProducts = (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
  const limitNumber = Math.max(parseInt(limit, 10) || 10, 1);

  const total = filteredProducts.length;
  const totalPages = Math.max(Math.ceil(total / limitNumber), 1);
  const startIndex = (pageNumber - 1) * limitNumber;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limitNumber);

  res.json({
    metadata: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages
    },
    data: paginatedProducts
  });
};

const searchProducts = (req, res, next) => {
  const { q = '' } = req.query;

  if (!q.trim()) {
    return next(new ValidationError('Query parameter "q" is required for search'));
  }

  const matches = products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));

  res.json({
    count: matches.length,
    data: matches
  });
};

const getProductStats = (req, res) => {
  const totalsByCategory = products.reduce((acc, product) => {
    const categoryKey = product.category.toLowerCase();
    acc[categoryKey] = (acc[categoryKey] || 0) + 1;
    return acc;
  }, {});

  const inStockCount = products.filter((product) => product.inStock).length;

  res.json({
    totalProducts: products.length,
    inStock: inStockCount,
    outOfStock: products.length - inStockCount,
    totalsByCategory
  });
};

const getProductById = (req, res, next) => {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return next(new NotFoundError(`Product with id ${req.params.id} not found`));
  }

  res.json(product);
};

const createProduct = (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.validatedProduct
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res, next) => {
  const productIndex = products.findIndex((item) => item.id === req.params.id);

  if (productIndex === -1) {
    return next(new NotFoundError(`Product with id ${req.params.id} not found`));
  }

  const updatedProduct = {
    ...products[productIndex],
    ...req.validatedProduct
  };

  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
};

const deleteProduct = (req, res, next) => {
  const productIndex = products.findIndex((item) => item.id === req.params.id);

  if (productIndex === -1) {
    return next(new NotFoundError(`Product with id ${req.params.id} not found`));
  }

  products.splice(productIndex, 1);
  res.status(204).send();
};

module.exports = {
  listProducts,
  searchProducts,
  getProductStats,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

