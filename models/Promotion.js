const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
