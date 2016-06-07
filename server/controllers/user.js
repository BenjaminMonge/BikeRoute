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
  models.User.findById(req.params.username, {include: [models.Event]}).then((userfound) => {
    userfound.getFriends().then((obj)=>{
      var friends = {}
      var candidates = {}
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].accepted) {
          friends[i] = obj[i]
        } else {
          candidates[i] = obj[i]
        }
      }

      response = {
        user: userfound.dataValues,
        friendlist: friends,
        friendwant: candidates
      }
      console.log(response.friendlist);
      res.status(200).send(response)
    })
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

module.exports.delete = (req, res) => {
  models.User.findById(req.user.username).then((usefound) => {
    userfound.destroy()
    res.status(200)
  }).catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.add = (req, res) => {
  models.User.findById(req.user.username).then((userfound) => {
    userfound.addFriend([req.body.username], {accepted: false})
    res.status(200)
  }).catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.agree = (req, res) => {
  models.User.findById(req.user.username).then((userfound) => {
    userfound.hasUser([req.body.username]).then((ass) => {
      ass.update({accepted: true})
      res.status(200)
    })
  }).catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.deny = (req, res) => {
  models.User.findById(req.user.username).then((userfound) => {
    userfound.removeUser([req.body.username])
    res.status(200)
  }).catch((error) => {
    res.status(500).send(error)
  })
}
