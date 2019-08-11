const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let roles = require('./../config/roles');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  promotions: {
    type: [Schema.Types.ObjectId],
    ref: 'Promotion'
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  discordId: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: roles.user
  }
});

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb){
  var userObj = new this();
  this.findOne({discordId : profile.discord.id},function(err,result){ 
      console.log(profile)
      console.log(result)
      if(!result){
          userObj.email = profile.discord.email;
          userObj.name = profile.discord.username;
          userObj.discordId = profile.discord.id;
          userObj.password = profile.discord.accessToken;
          userObj.save(cb);
      } else{
          cb(err,result);
      }
  });
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
