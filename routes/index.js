const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureRoleAuthenticated,
  forwardAuthenticated
} = require("../config/auth");

const Promotion = require("../models/Promotion");
const catchAsync = fn => (req, res, next) => {
  const routePromise = fn(req, res, next);
  if (routePromise.catch) {
    routePromise.catch(err => next(err));
  }
};

// Welcome Page
router.get(
  "/",
  forwardAuthenticated,
  catchAsync(async (req, res) => {
    res.render("pages/welcome");
  })
);


// Dashboard
router.get("/dashboard", ensureRoleAuthenticated, (req, res) => {
  Promotion.findById(req.user.promotions[0], (err, res) => {
    console.log(res);
  });

  res.render("pages/dashboard", {
    user: req.user
  });
});


module.exports = router;
