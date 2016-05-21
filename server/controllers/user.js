var models = require('../models')
var jwt = require('jsonwebtoken');

function decrypt(input) {
  decoded = jwt.verify(input, 'iatepie')
  return decoded.username
}

module.exports.addEvent = (req, res) => {
  username = decrypt(req)
  models.User.findById(username).then((userfound) => {
    userfound.addEvent(req.body.data, {created: true, transaction: t})
  }).catch((error) => {
    res.status(500)
  })
}

module.exports.updateUser = (req, res) => {
    username = decrypt(req.body.username)
    userdata = req.body.userdata
    console.log(userdata.City)
    models.User.findById(username, {include: [models.City]}).then((userfound) => {
      userfound.updateAttributes(userdata)
      userfound.City.updateAttributes(userdata.City)
    }).catch((error) => {
      res.status(500)
    })
}

module.exports.getUser= (req, res) => {
  username = decrypt(req.body.username)
  models.User.findById(username, {include: [models.Event, models.City]}).then((userfound) => {
      console.log(userfound)
      res.json(userfound)
  }).catch((error) => {
    res.status(500)
  })
}

module.exports.comment = (req, res) => {
  models.UserEvent.build(req.body).save()
}
