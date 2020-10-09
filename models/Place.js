const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: { type: String },
  thumbnail: { type: String, required: true },
  content: {
    type: String,
    required: true
  },
  category: { type: String, required: true },
  location: { type: String, required: true },
  info: String,
  link: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('place', PlaceSchema);
