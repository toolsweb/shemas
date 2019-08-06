const express = require("express");
const router = express.Router();

const Promotion = require("../../models/Promotion");
const Brief = require("../../models/Brief");
const formidable = require("formidable");


router.get("/create", (req, res) => {
  Promotion.findById(req.user.promotions[0], (err, res) => {
    console.log(res);
  });
  res.render("pages/brief/create", {});
});

router.get("/explore", (req, res) => {

  Brief.find()
    .populate("user_id promotion_id")
    .select("title private banner enonce role promo_id user_id")
    .where("private")
    .equals(false)
    .then(briefs => {
      console.log(briefs);
      res.render("pages/brief/explore", { briefs });
    })
    .catch(err => res.status(404).json({ msg: "No items found" }));
});


router.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm(),
  files = [],
  fields = [];
  form.on('field', function(field, value) {
      fields.push([field, value]);
  })
  form.on('file', function(field, file) {
      files.push([field, file]);
  })
  form.on("fileBegin", function(name, file) {
    if (file.name)
      file.path = __dirname + "/../public/uploads/" + file.name;   
  });
  form.parse(req, (err, fields, files) => {

    if (err) {
      console.error("Error", err);
      throw err;
    }
    console.log("Fields", fields);
    console.log("Files", files);
    console.log(files.files.name)
    // files.map(file => {
    //   console.log(file)
    // })
    let brief = new Brief({
      user_id: req.user._id,
      title: fields.title,
      enonce: fields.editordata,
      banner: files.files.name
    });
    brief.save().then(id => {
      req.flash("success_msg", "confirmation");
     
    });
    res.redirect('/brief/create')

  });
});


module.exports = router;
