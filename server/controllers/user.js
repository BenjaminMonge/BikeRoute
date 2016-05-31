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
  console.log('got here');
  models.User.findById(req.params.username).then((userfound) => {
    userfound.getEvents().then((evf) => {
      var evs = {}
      if(evf.length > 0){
        delete evf[0].dataValues.UserEvent
        evs[0] = evf[0].dataValues
        for (var i = 1; i < evf.length; i++) {
          delete evf[i].dataValues.UserEvent
          evs[i] = evf[i].dataValues
        }
      } else {
        evs[0] = {
          eventid: 0,
          evtname: 'NULL',
          description: 'You havent participated in any events'
        }
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
  req.body.image = req.file.path
    models.User.findById(req.user.username, {include: [models.City]}).then((userfound) => {
      userfound.update(req.body).then(() => {
        res.json(userfound)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
}
