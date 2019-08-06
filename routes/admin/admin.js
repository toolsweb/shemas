const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Promo = require("../../models/Promotion");
const AskRoleConfirmation = require("../../models/AskRoleConfirmation");

router.get("/dashboard", (req, res, next) => {
  Promo.find().then(promos => {
    console.log(promos);
    res.render("admin/pages/dashboard", {
      admin: req.user,
      promos: promos
    });
  });
});

router.get("/asks/confirmations", (req, res, next) => {
  AskRoleConfirmation.find()
    .populate("user_id promotion_id")
    .select("role promo_id user_id")
    .where("actif")
    .equals(false)
    .then(asks => {
      console.log(asks);
      res.render("admin/pages/asks", { asks });
    })
    .catch(err => res.status(404).json({ msg: "No items found" }));
});

router.post("/asks/confirmations", (req, res, next) => {
  console.log(req.body.promotion_id);
  var query = { _id: req.body.user_id };

  req.newData = {
    role: req.body.role,
    $push: {
      promotions: req.body.promotion_id
    }
  };
  User.findOneAndUpdate(query, req.newData, { upsert: true }, function(
    err,
    doc
  ) {
    if (err) return res.send(500, { error: err });
    AskRoleConfirmation.findOneAndUpdate(
      { _id: req.body.ask_id },
      { actif: true },
      (err, doc) => {
        if (err) return res.send(500, { error: err });
      }
    );

    return res.redirect('/ask/confirmation')
  });
});

router.get("/users", (req, res, next) => {
  User.find()
    .then(users => res.render("admin/pages/users/users", { users }))
    .catch(err => res.status(404).json({ msg: "No items found" }));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
