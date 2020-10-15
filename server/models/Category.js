const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: { type: String, required: true },
  location: { type: Array, required: true }
});

module.exports = mongoose.model('category', CategorySchema);
