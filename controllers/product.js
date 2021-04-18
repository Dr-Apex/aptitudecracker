const Product = require('../models/product');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
  .populate('category')
  .exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: 'Product not found'
      });
    }

    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to save product in DB'
      });
    }

    res.json({
      name: product.name
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete the product'
      });
    }

    res.json({
      message: 'Deletion was a success',
      deletedProduct
    });
  });
};

exports.updateProduct = (req, res) => {
  const product = req.product;
  product.answered = req.body.answered;

  // save to DB
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        error: 'Updation of tshirt failed'
      });
    }

    res.json(product);
  });
};

exports.getAllProducts = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  Product.find()
  .select('-photo')
  .populate('category')
  .sort([[sortBy, 'asc']])
  .exec((err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'NO product FOUND'
      });
    }

    res.json(products);
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'NO category found'
      });
    }

    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count, sold: +prod.count}}
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Bulk operation failed'
      });
    }
    next();
  });
};
