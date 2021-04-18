const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 64,
    unique: true
  },
  topic: {
    type: ObjectId,
    ref: 'Topic'
  }
}, {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);
