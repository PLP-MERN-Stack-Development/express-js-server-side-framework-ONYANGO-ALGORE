const { ValidationError } = require('../utils/errors');

const PRODUCT_FIELDS = ['name', 'description', 'price', 'category', 'inStock'];

const validateProduct = (requireAllFields = true) => (req, res, next) => {
  const payload = { ...req.body };
  const errors = [];

  if (requireAllFields) {
    PRODUCT_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(payload, field)) {
        errors.push(`${field} is required`);
      }
    });
  } else {
    const hasAtLeastOneField = PRODUCT_FIELDS.some((field) =>
      Object.prototype.hasOwnProperty.call(payload, field)
    );

    if (!hasAtLeastOneField) {
      errors.push('At least one product field must be provided for update');
    }
  }

  if (payload.name !== undefined) {
    if (typeof payload.name !== 'string' || !payload.name.trim()) {
      errors.push('name must be a non-empty string');
    } else {
      payload.name = payload.name.trim();
    }
  }

  if (payload.description !== undefined) {
    if (typeof payload.description !== 'string' || !payload.description.trim()) {
      errors.push('description must be a non-empty string');
    } else {
      payload.description = payload.description.trim();
    }
  }

  if (payload.price !== undefined) {
    if (typeof payload.price !== 'number' || Number.isNaN(payload.price) || payload.price < 0) {
      errors.push('price must be a positive number');
    }
  }

  if (payload.category !== undefined) {
    if (typeof payload.category !== 'string' || !payload.category.trim()) {
      errors.push('category must be a non-empty string');
    } else {
      payload.category = payload.category.trim().toLowerCase();
    }
  }

  if (payload.inStock !== undefined && typeof payload.inStock !== 'boolean') {
    errors.push('inStock must be a boolean value');
  }

  if (errors.length) {
    return next(new ValidationError(errors.join(', ')));
  }

  req.validatedProduct = payload;
  return next();
};

module.exports = {
  validateProduct
};

