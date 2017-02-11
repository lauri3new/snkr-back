const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

// models
const Product = require('../models/product').product;

router.get('/', (req, res) => {
  Product.aggregate({ $group: { _id: '$Points' } }).sort({ Points: -1 }).limit(10).exec()
  .then((products) => {
    res.json(products);
  })
  .catch(err => res.json({ error: err }));
});

module.exports = router;
