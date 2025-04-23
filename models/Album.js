const mongoose = require('mongoose');

const CloudinaryImageSchema = new mongoose.Schema({
  id: String,
  publicId: String,
  url: String,
  width: Number,
  height: Number
});

const AlbumSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  coverId: String,
  coverUrl: String,
  imageCount: Number,
  images: [CloudinaryImageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Album', AlbumSchema); 