const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Promo = require("../../models/Promotion");
const Referenciel = require("../../models/Referentiel");
const Competence = require("../../models/Competence");
const Activity = require("../../models/Activity");
const Level = require("../../models/Level");

router.get("/list", (req, res, next) => {
  Referenciel.find()
    .then(referentiels =>
      res.render("admin/pages/referentiels/list", { referentiels })
    )
    .catch(err => res.status(404).json({ msg: "No items found" }));
});

router.get("/create", (req, res, next) => {
  res.render("admin/pages/referentiels/create");
});

router.get("/show/:_id", (req, res, next) => {
  console.log(req.params._id);
  Referenciel.findOne({_id: req.params._id})
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
      res.render("admin/pages/referentiels/show", {
        referentiel: referentiel
      });
 
});
})

router.post("/create", (req, res, next) => {
  const { title } = req.body;
  console.log(title);

  const newReferentiel = new Referenciel({
    title: title
  });

  newReferentiel.save().then(referentiel => {
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("list");
  });
});

router.post("/activities/create", (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const newActivity = new Activity({
    title: req.body.title
  });

  newActivity.save().then(activity => {
    req.flash("success_msg", "You are now registered and can log in");

    var query = { _id: req.body.referentiel_id };

    req.newData = {
      $push: {
        activities: activity._id
      }
    };
    Referenciel.findOneAndUpdate(query, req.newData, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });

      return res.redirect("/admin/referentiels/show/" +req.body.referentiel_id );
    });
  });
});


router.post("/activities/competences/create", (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const newCompetence = new Competence({
    title: req.body.title
  });

  newCompetence.save().then(competence => {
    req.flash("success_msg", "You are now registered and can log in");

    var query = { _id: req.body.activity_id };

    req.newData = {
      $push: {
        competences: competence._id
      }
    };
    Activity.findOneAndUpdate(query, req.newData, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });

      return res.redirect("/admin/referentiels/show/" +req.body.referentiel_id );
    });
  });
});

router.post("/activities/competences/levels/create", (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const newLevel = new Level({
    number: req.body.number
  });

  newLevel.save().then(level => {
    req.flash("success_msg", "You are now registered and can log in");

    var query = { _id: req.body.competence_id };





    
    req.newData = {
      $push: {
        levels: level._id
      }
    };
    Competence.findOneAndUpdate(query, req.newData, { upsert: true }, function(
      err,
      doc
    ) {
      if (err) return res.send(500, { error: err });

      return res.redirect("/admin/referentiels/show/" +req.body.referentiel_id );
    });
  });
});

router.post("/update",  (req, res, next) => {
  console.log(req.body);
  var query = { _id: req.body.referentiel_id };
  req.newData = {
    title: req.body.title
  };
  Referenciel.findOneAndUpdate(query, req.newData, { upsert: true }, function(
    err,
    doc
  ) {
    if (err) return res.send(500, { error: err });

    return res.send(202, req.newData)
  });
  
});



module.exports = router;
