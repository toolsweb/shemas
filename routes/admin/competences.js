const Activity = require('../../models/Activity');
const Competence = require('../../models/Competence');

module.exports = function(router) {
  router.post('/activities/competences/create', (req, res, next) => {
    const newCompetence = new Competence({
      title: req.body.title
    });

    newCompetence.save().then(competence => {
      req.flash('success_msg', 'New competence');
      var query = { _id: req.body.activity_id };

      req.newData = {
        $push: {
          competences: competence._id
        }
      };
      Activity.findOneAndUpdate(query, req.newData, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });

        return res.redirect('/admin/referentiels/show/' + req.body.referentiel_id);
      });
    });
  });
};
