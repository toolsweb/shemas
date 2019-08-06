const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  actions:{
    type: String,
  },
  evaluation:
  {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Level = mongoose.model('Level', LevelSchema);

module.exports = Level;
