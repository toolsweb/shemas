const helmet = require("helmet");
const frameguard = require("frameguard");

module.exports = function(app) {
  app.use(helmet());
  app.use(helmet.frameguard({ action: "sameorigin" }));
  app.use(frameguard({ action: "sameorigin" }));
  app.use(frameguard()); // defaults to sameorigin
  app.use(
    frameguard({
      action: "allow-from",
      domain: "https://discordapp.com"
    })
  );
};
