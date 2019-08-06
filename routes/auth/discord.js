const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');

router.get('/login', forwardAuthenticated, passport.authenticate('discord'));
router.get('/callback', forwardAuthenticated, passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/dashboard') // Successful auth
});

module.exports = router;
