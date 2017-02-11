const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product').product;
// const productViewModel = require('../viewmodels/product');

router.get('/:searchterm/:sortby/:order/:page', (req, res, next) => {
  const searchTerm = req.params.searchterm;
  const sortBy = req.params.sortby;
  const page = req.params.page;
  const order = req.params.order;
  if (req.params.order === 1) {
    next(err);
  }
  console.log(searchTerm, sortBy, page);
  Product.find({ $text: { $search: `"${searchTerm}"` } })
  .limit(90).skip(90 * page).sort({ [sortBy]: `${order}` })
  .exec()
  .then(products => res.json(products))
  .catch(err => res.json({ error: err }));
});

module.exports = router;
