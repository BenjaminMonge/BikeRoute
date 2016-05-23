var models = require('../models')
var passport = require('passport')

module.exports.session = function (req, res) {
  var userfound = req.user.dataValues
  res.json({'username': userfound.username, 'email': userfound.email})
};


module.exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var error = err || info;
    if (error) { return res.status(400).json(error) }
    req.logIn(user, (err) => {
      if (err) { return res.send(err) }
      res.json({'username': user.username, 'email': user.email})
    });
  })(req, res, next);
}
