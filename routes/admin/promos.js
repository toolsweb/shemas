const Promo = require('../../models/Promotion');

module.exports = function(router) {
  router.get('/promos/list', (req, res, next) => {
    Promo.find()
      .then(promos => res.render('admin/pages/promos/list', { promos }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  });

  router.get('/promos/create', (req, res, next) => {
    res.render('admin/pages/promos/create');
  });

  // Login
  router.post('/promos/create', (req, res, next) => {
    const { city, createAt } = req.body;

    const newPromo = new Promo({
      city: city
    });

    newPromo.save().then(promo => {
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/admin/promos/list');
    });
  });
};
