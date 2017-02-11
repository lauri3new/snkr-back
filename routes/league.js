const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product').product;
const productViewModel = require('../models/product').productView;

router.get('/', (req, res) => {
  if (!req.xhr) {
    next();
  } else {
  Product.find().sort({ Points: -1 }).limit(9).exec()
  .then(products => res.json(products.map(product => productViewModel(product))))
  .catch(err => res.json({ error: err }));
  }
});

module.exports = router;
