const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => res.render("admin/pages/login"));

router.post("/", (req, res, next) => {
  console.log(req);
  passport.authenticate("admin-local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = router;

