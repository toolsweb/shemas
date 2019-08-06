const express = require("express");
const router = express.Router();

const Promotion = require("../../models/Promotion");


router.get("/roles", (req, res) => {
    Promotion.find({}).then(promotions => {
    res.render("pages/ask_roles", { promotions: promotions });
    });
})
  
router.post("/roles", (req, res) => {
    let ask = new AskRoleConfirmation({
        promotion_id: req.body.promotion_id,
        user_id: req.user._id,
        role: req.body.role
    });
    ask.save().then(id => {
        req.flash("success_msg", "confirmation");
    });
    res.redirect("/ask/roles");
})

module.exports = router;
