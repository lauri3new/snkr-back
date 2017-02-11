const Transform = require('stream').Transform;
const csv = require('csvtojson');
const stream = require('stream');
const productImport = require('./models/product.js').productImport;
const Product = require('./models/product').product;

let counter = 1;

const importProducts = (req, res) => {
  const handleError = (error) => {
    let err = error.toString();
    res.json({ done: err });
  };

  // getCSV from file
  const getCSV = csv({ delimiter: ',' }, { objectMode: true })
  .fromFile('../sneakers.csv');

  // transform product from csv -- adds extra fields etc..
  const modifyObj = new Transform({ objectMode: true });
  modifyObj._transform = function (data, encoding, callback) {
    this.push(productImport(data, counter));
    counter++;
    callback();
  };

  // convert to mongoose object and save
  const saveObj = new Transform({ objectMode: true });
  saveObj._transform = function (data, encoding, callback) {
    let product = new Product(data);
    product.save(() => {
      callback();
    });
  };

  // end stream call respond to server with sucess msg
  const out = new stream.Writable({ objectMode: true });
  out.on('finish', () => {
    counter = 0;
    res.json({ completo: 'done' });
  });

  getCSV.on('error', e => handleError(e))
  .pipe(modifyObj)
  .on('error', e => handleError(e))
  .pipe(saveObj)
  .on('error', e => handleError(e))
  .pipe(out)
  .on('error', e => handleError(e));
};

exports.importProducts = importProducts;
