const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports.index = function (req, res) {
  if (config.auth.key && !req.session.auth) {
    return res.redirect('/login');
  }

  if ([ 'phone', 'tablet' ].includes(req.device.type)) {
    return res.render('mobile');
  }

  return res.render('index');
};

module.exports.about = function (req, res) {
  const readmePath = path.join(__dirname, '../../..', 'README.md');
  const readme = fs.readFileSync(readmePath, { encoding: 'utf8' });

  return res.json({
    ok: true,
    contents: readme
  });
};

module.exports.snippet = function (req, res) {
  if ([ 'phone', 'tablet' ].includes(req.device.type)) {
    const { key } = req.params;
    const keyComponents = key.split('.');

    if (keyComponents.length > 1) {
      keyComponents.pop();
    }

    return res.redirect(`/raw/${keyComponents.join('.')}`);
  }

  return res.render('index');
};
