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
  console.log('request received');
  models.User.findById(req.params.username, {include: [models.Event]}).then((userfound) => {
    response = {
      user: userfound.dataValues,
      events: userfound.Events
    }
    res.status(200).send(response)
  }).catch((error) => {
    res.status(500)
  })
}

module.exports.update = (req, res) => {
  req.body.image = req.file.path
  console.log(req.body.path);
  models.User.findById(req.user.username, {include: [models.City]}).then((userfound) => {
      userfound.update(req.body).then(() => {
        response = {
          user: userfound.dataValues,
          events: userfound.Events
        }
        res.status(200).send(response)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
}
