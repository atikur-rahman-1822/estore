const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const products = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model('products', products);
