const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product').product;

router.get('/:clubID', (req, res) => {
  const clubID = req.params.clubID;
  Product.findOneAndUpdate({ ID: clubID }, { $inc: { Points: 3 } }, { new: true }).exec()
  .then((kits) => {
    res.json(kits);
  })
  .catch(err => res.json({ error: err }));
});

module.exports = router;
