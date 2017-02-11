const express = require('express');
const mongoose = require('mongoose');
const randomise = require('../mymodules/loj.js').randomise;
const partition = require('../mymodules/loj.js').partition;

const router = express.Router();

mongoose.Promise = Promise;

// models
const Product = require('../models/product').product;
const productViewModel = require('../models/product').productView;

router.param('id', (req, res, next, id) => {
  console.log(id);
  if (id !== 'init') {
    req.id = id;
  } else {
    req.id = 'init';
  }
  next();
});

router.get('/:id', (req, res, next) => {
  if (!req.xhr) {
    next();
  }
  if (req.id == 'init') {
    Product.count().exec((err, count) => {
      const randoms = randomise(6, count);
      console.log('random ids : ' + randoms);
      Product.find({ ID: { $in: randoms } }).exec()
      .then((products) => {
        res.json(partition(products.map(product => productViewModel(product))));
      })
      .catch(() => res.json({ error: "something went wrong" }));
    });
  }

    Product.findOneAndUpdate({ ID: req.id }, { $inc: { Points: 3 } }, { new: true }).exec()
    .then()
    .catch((err) => { console.log('internal error adding points', err); });

  Product.count().exec((err, count) => {
    const randoms = randomise(4, count);
    console.log('random ids : ' + randoms);
    Product.find({ ID: { $in: randoms } }).exec()
    .then((products) => {
      res.json(partition(products.map(product => productViewModel(product))));
    })
    .catch(() => res.json({ error: "something went wrong" }));
  });
});

module.exports = router;
