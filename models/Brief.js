const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BriefSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  promotion_id: {
    type: Schema.Types.ObjectId,
    ref: 'Promotion'
  },
  banner: {
    type: String,
  },
  title : {
    type: String,
  },
  enonce : {
    type: String,
  },
  private: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Brief = mongoose.model('Brief', BriefSchema);

module.exports = Brief;
