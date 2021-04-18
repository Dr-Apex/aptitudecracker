const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 2000
  },
  optionA: {
    type: String,
    required: true,
    maxlength: 100
  },
  optionB: {
    type: String,
    required: true,
    maxlength: 100
  },
  optionC: {
    type: String,
    required: true,
    maxlength: 100
  },
  optionD: {
    type: String,
    required: true,
    maxlength: 100
  },
  correctOption: {
    type: String,
    required: true,
    maxlength: 100
  },
  topic: {
    type: ObjectId,
    ref: 'Topic'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  time: {
    type: String,
    required: true,
    maxlength: 16
  },
  answered: {
    type: Boolean
  }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
