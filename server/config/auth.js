/* La parte que se asegura que el usuario este autenticado*/

module.exports.access = function provideAccess(req, res, next) {
if(req.isAuthenticated()) {return next()}
  res.sendStatus(401)
}

module.exports.canEdit = function canEdit(req, res, next) {
  if (req.body.username == req.user.username) {
    return next()
  }
  res.status(403).send('Not authorized')
}
