const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompetenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  levels: {
    type: [Schema.Types.ObjectId],
    ref: "Level"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Competence = mongoose.model("Competence", CompetenceSchema);

module.exports = Competence;
