const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let roles = require('./../config/roles');

const AskRoleConfirmationSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  promotion_id: {
    type: Schema.Types.ObjectId,
    ref: 'Promotion'
  },
  role : {
    type: String,
    default: roles.user
  },
  actif: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const AskRoleConfirmation = mongoose.model('AskRoleConfirmation', AskRoleConfirmationSchema);

module.exports = AskRoleConfirmation;
