const Activity = require('../../models/Activity');
const Referenciel = require('../../models/Referentiel');

module.exports = function(router) {
  router.post('/activities/create', (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    const newActivity = new Activity({
      title: req.body.title
    });

    newActivity.save().then(activity => {
      req.flash('success_msg', 'You are now registered and can log in');

      var query = { _id: req.body.referentiel_id };

      req.newData = {
        $push: {
          activities: activity._id
        }
      };
      Referenciel.findOneAndUpdate(query, req.newData, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });

        return res.redirect('/admin/referentiels/show/' + req.body.referentiel_id);
      });
    });
  });
};
