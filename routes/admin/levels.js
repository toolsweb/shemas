
const Level = require("../../models/Level");

module.exports = function(router) {
  router.post('/activities/competences/levels/create', (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    const newLevel = new Level({
      number: req.body.number
    });

    newLevel.save().then(level => {
      req.flash('success_msg', 'You are now registered and can log in');

      var query = { _id: req.body.competence_id };
      req.newData = {
        $push: {
          levels: level._id
        }
      };
      Competence.findOneAndUpdate(query, req.newData, { upsert: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });

        return res.redirect('/admin/referentiels/show/' + req.body.referentiel_id);
      });
    });
  });
};
