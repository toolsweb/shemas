const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Promo = require('../../models/Promotion');

router.get('/list', (req, res, next) => {
    Promo.find()
    .then(promos => res.render('admin/pages/promos/list', { promos }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));    
});

router.get('/create', (req, res, next) => {
 res.render('admin/pages/promos/create');
});


// Login
router.post('/create', (req, res, next) => {
  const { city, createAt } = req.body;
  
  const newPromo = new Promo({
    city: city
  });

  newPromo.save().then(promo => {
    req.flash(
      'success_msg',
      'You are now registered and can log in'
    );
    res.redirect('/admin/promos/list')
  })

});

module.exports = router;
