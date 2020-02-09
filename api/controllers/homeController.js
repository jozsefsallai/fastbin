const fs = require('fs');
const path = require('path');

module.exports.index = function (req, res) {
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
