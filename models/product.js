const mongoose = require('mongoose');
const matchSearch = require('../mymodules/loj.js').matchSearch;

const Schema = mongoose.Schema;

const brands = ['Nike', 'new balance', 'reebok', 'supra'];

const productSchema = new Schema({
  ID: Number,
  OurAffLink: String,
  Title: String,
  Image: String,
  Price: Number,
  Merchant: String,
  Points: 0,
  Brand: String,
  Type: String
});

const product = mongoose.model('product', productSchema);

const productView = (product) => {
  return {
    ID: product.ID,
    buyLink: product.OurAffLink,
    ImageLink: product.Image,
    Price: product.Price,
    Title: product.Title,
    Points: product.Points,
    Brand: product.Brand
  };
};

const productImport = (product, Id) => ({
  ID: Id,
  OurAffLink: product.OurAffLink,
  Title: product.Title,
  Image: product.Image,
  Price: product.Price,
  Merchant: product.Merchant,
  Points: 0,
  Brand: matchSearch(product.Title, brands)
});

exports.product = product;
exports.productView = productView;
exports.productImport = productImport;
