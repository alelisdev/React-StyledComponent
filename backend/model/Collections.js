const mongoose = require('mongoose');

const collectionsSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
  },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  count: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  imageList: {
    type: Array,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
});

module.exports = mongoose.model('Collections', collectionsSchema);
