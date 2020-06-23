const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: { type: String },
  // thumbnail: { type: String, required: true },
});

module.exports = mongoose.model('location', LocationSchema);
