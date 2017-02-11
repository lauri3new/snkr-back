const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product').product;
const productViewModel = require('../models/product').productView;

router.param('page', (req, res, next, page) => {
  const validateNum = (p) => {
    return p.match(/^\d+$/);
  };
  // req.page = page;
  if (validateNum(page)) {
    Product.count().exec((err, count) => {
      if (page <= Math.ceil(count / 9)) {
        next();
      }
      else {
        res.sendStatus(404);
      }
    });
  }
  else {
    res.sendStatus(404);
  }
});

router.use('/page/:page', (req, res) => {
  const pageNumber = req.params.page;
  Product.find().limit(9).skip(pageNumber * 9).exec()
  .then(products => res.json(products.map(product => productViewModel(product))))
  .catch(err => res.json(err));
});

module.exports = router;
