const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferentielSchema = new mongoose.Schema({
  activities:[
  {
    type: Schema.Types.ObjectId,
    ref: 'Activity'
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

const Referentiel = mongoose.model("Referentiel", ReferentielSchema);

module.exports = Referentiel;
