const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: { type: String, required: [true, 'Thumbnail is required'] }
});

module.exports = mongoose.model('location', LocationSchema);
