
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

module.exports = {
  up(db) {
    // TODO write your migration here. Return a Promise (and/or use async & await).
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:

    const admin = new Admin({
      name :'admin',
      password: 'iloveyou',
      email:'lysafichot@gmail.com',
    });

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(admin.password, salt);
// Store hash in your password DB.


    admin.password = hash;

    return db.collection('admins').insertOne(admin);
  },

  down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
