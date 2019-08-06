const mongoose = require("mongoose");

module.exports = function(config) {
  const db = config.mongoURI;
  // Connect to MongoDB
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

  return mongoose;
};
