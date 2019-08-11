const LocalStrategy = require('passport-local').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;

const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Admin = require('../models/Admin');

var scopes = ['identify', 'email'];
const config = require('./index');


module.exports = function(passport) {
  passport.use(new DiscordStrategy({
    clientID: config.discord.client_id,
    clientSecret: config.discord.client_secret,
    callbackURL: '/api/discord/callback',
    scope: scopes
  }, function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ discord: profile }, function(err, user) {
          return cb(err, user);
      });
  }));
  passport.use('user-local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );
  passport.use('admin-local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    Admin.findOne({
      email: email
    }).then(admin => {
      if (!admin) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, admin);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (user)
        done(err, user);
      else
      {
        Admin.findById(id, function(err, admin) {
          done(err, admin);
        });
      }
    });
  });
};
