const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ActivitySchema = new mongoose.Schema({
  competences:[
  {
    type: Schema.Types.ObjectId,
    ref: 'Competence'
  }],
  title: {
    type: String,
    required: false
  },
  lang: {
    type: String,
    default: 'fr'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
