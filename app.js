require("dotenv").config();

var formidable = require('formidable');

const express = require("express");
const passport = require("passport");
const i18n = require("i18n-express");
const path = require('path');

const {
  isAdminAuthenticated,
  ensureAuthenticated,
  forwardAuthenticated
} = require("./config/auth");

let app = express();
const config = require("./config/index");

const options = [];
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["en","fr"],
  textsVarName: 'translation'
}));


// Passport Config
require("./config/passport")(passport);
const mongoose = require("./config/database")(config);
require("./config/helmet")(app);
require("./config/globale")(app, mongoose);

app.use("/admin/login", require("./routes/admin/login.js"));
app.use("/admin/promos", require("./routes/admin/promos.js"));
app.use("/admin/referentiels", require("./routes/admin/referentiels.js"));
app.use("/admin", isAdminAuthenticated, require("./routes/admin/admin.js"));

app.use("/users", require("./routes/auth/users.js"));
app.use("/api/discord", require("./routes/auth/discord.js"));
app.use("/brief", require("./routes/brief/brief.js"));

app.use("/ask", ensureAuthenticated, require("./routes/ask/ask.js"));

app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
