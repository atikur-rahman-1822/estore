const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  image_url: String
});

module.exports = mongoose.model('Product', productSchema);