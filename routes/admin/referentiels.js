const Referenciel = require('../../models/Referentiel');

module.exports = function(router) {
  router.get('/referentiels/list', (req, res, next) => {
    Referenciel.find()
      .then(referentiels => res.render('admin/pages/referentiels/list', { referentiels }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
  });

  router.get('/referentiels/create', (req, res, next) => {
    res.render('admin/pages/referentiels/create');
  });

  router.post('/referentiels/create', (req, res, next) => {
    const { title } = req.body;
    console.log(title);

    const newReferentiel = new Referenciel({
      title: title
    });

    newReferentiel.save().then(referentiel => {
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('list');
    });
  });

  router.get('/referentiels/show/:_id', (req, res, next) => {
    console.log(req.params._id);
    Referenciel.findOne({ _id: req.params._id })
      .populate({
        path: 'activities',
        model: 'Activity',
        populate: {
          path: 'competences',
          model: 'Competence',
          populate: {
            path: 'levels',
            model: 'Level'
          }
        }
      })
      .exec((err, referentiel) => {
        res.render('admin/pages/referentiels/show', {
          referentiel: referentiel
        });
      });
  });

  router.post('/referentiels/update', (req, res, next) => {
    console.log(req.body);
    var query = { _id: req.body.referentiel_id };
    req.newData = {
      title: req.body.title
    };
    Referenciel.findOneAndUpdate(query, req.newData, { upsert: true }, function(err, doc) {
      if (err) return res.send(500, { error: err });

      return res.send(202, req.newData);
    });
  });
};
