
const seeder = require('mongoose-seed');

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: 'Referentiel',
    documents: [
      {
        title: 'Web'
      },
      {
        title: "Concepteur d'application"
      }
    ]
  }
];
module.exports = function() {
  // Connect to MongoDB via Mongoose
  seeder.connect('mongodb://localhost/test', function() {
    // Load Mongoose models
    seeder.loadModels(['./models/Referentiel.js']);

    // Clear specified collections
    seeder.clearModels(['Referentiel'], function() {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    });
  });
};
