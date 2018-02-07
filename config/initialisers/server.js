const express = require('express');
const bodyParser = require('body-parser');
let app;

const start = (cb) => {
  app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  if (cb) {
    return cb();
  }

  app.listen(8000, () => {
    console.log('Listen to app at port ' + 8000);
  });
};

module.exports = start;