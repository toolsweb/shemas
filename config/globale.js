const engine = require('ejs-locals');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

module.exports = function(app, mongoose) {
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../node_modules')));

  app.use(express.urlencoded({ extended: true, uploadDir: __dirname + '/public/uploads' }));

  app.use(
    session({
      secret: 'secret',
      maxAge: new Date(Date.now() + 360000000),
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 900000 }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  return app;
};
