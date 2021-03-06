/* La parte que se asegura que el usuario este autenticado*/

module.exports.access = function provideAccess(req, res, next) {
if(req.isAuthenticated()) {return next()}
  res.json(null)
}

module.exports.canEdit = function canEdit(req, res, next) {
  if (req.body.username == req.user.username) {
    return next()
  }
  res.status(403).send('Not authorized')
}

exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};
