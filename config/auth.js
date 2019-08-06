const Admin = require('../models/Admin');
const User = require('../models/User');
const roles = require('./roles');

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) 
      return next();
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  ensureRoleAuthenticated: (req, res, next) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
      if (req.user.role == roles.facilitator 
        || req.user.role == roles.student)
        return next();
      else 
        res.redirect('/ask/roles');
    } 
  },

  isAdminAuthenticated: (req, res, next) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
      let admin = Admin.findOne({ email: req.user.email }).then(user => {
        console.log(user);
        return user;
      });
      if (admin)
        return next();
      else 
        res.redirect('/users/login');
    } 
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
