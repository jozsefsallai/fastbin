const fs = require('fs');
const path = require('path');

module.exports.index = function (req, res) {
  if ([ 'phone', 'tablet' ].includes(req.device.type)) {
    return res.render('mobile');
  }

  return res.render('index');
};

module.exports.about = function (req, res) {
  const readmePath = path.join(__dirname, '..', '..', 'README.md');
  const readme = fs.readFileSync(readmePath, { encoding: 'utf8' });

  return res.json({
    ok: true,
    contents: readme
  });
};

module.exports.snippet = function (req, res) {
  if ([ 'phone', 'tablet' ].includes(req.device.type)) {
    return res.redirect(`/raw/${req.params.key}`);
  }

  return res.render('index');
};
