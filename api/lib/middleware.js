const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

module.exports = function (app) {
  app.root = path.resolve(__dirname, '..', '..');

  app.set('views', path.resolve(app.root, 'api', 'views'));
  app.set('view engine', 'pug');

  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(path.resolve(app.root, 'public')));
};
