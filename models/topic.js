const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 64,
    unique: true
  },
  exam: {
    type: Boolean
  }
}, {timestamps: true});

module.exports = mongoose.model('Topic', topicSchema);
