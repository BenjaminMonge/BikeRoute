var models = require('../models')
var bcrypt = require('bcryptjs')


module.exports.create = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password= hash;
        models.User.build(req.body).save().then(function (membersaved) {
        req.logIn(membersaved, (err) => {
            if (err) { return res.send(err) }
              res.json({'username': membersaved.username, 'email': membersaved.email})
          });
        }).catch(function (error) {
            res.statusCode = 400
            res.send('User already exists')
        })

    })
  })
}

module.exports.get = (req, res) => {
  models.User.findById(req.params.username).then((userfound) => {
    userfound.getEvents().then((evf) => {
      var evs = {}
      delete evf[0].dataValues.UserEvent
      evs[0] = evf[0].dataValues
      for (var i = 1; i < evf.length; i++) {
        delete evf[i].dataValues.UserEvent
        evs[i] = evf[i].dataValues
      }
      response = {
        user: userfound.dataValues,
        events: evs
      }
      res.status(200).send(response)
    })
  }).catch((error) => {
    res.status(500)
  })
}

module.exports.update = (req, res) => {
    models.User.findById(req.user.username, {include: [models.City]}).then((userfound) => {
      userfound.update(req.body).then(() => {
        res.json(userfound)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
}

module.exports.comment = (req, res) => {
  models.UserEvent.build(req.body).save()
}
