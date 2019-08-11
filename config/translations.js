
const i18n = require("i18n-express");
const path = require('path');

module.exports = function(app) {
  const options = [];
  app.use(
    i18n({
      translationsPath: path.join(__dirname, '../i18n'),
      siteLangs: ['en', 'fr'],
      textsVarName: 'translation'
    })
  );
};
