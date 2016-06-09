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
    models.Friendship.findAll({where: {
    $or: [
      {
        FriendUsername:{$eq: req.params.username}
      },
      {
        UserUsername: {$eq: req.params.username}
      }
    ]
  }}).then((arr) => {
    var friends = {}
    var cand = {}
    var j=0
    var k=0
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].accepted) {
          if(arr[i].UserUsername !== req.params.username) {friends[j]=arr[i].UserUsername}
          if(arr[i].FriendUsername !== req.params.username) {friends[j]=arr[i].FriendUsername}
          j++
        } else {
          if((arr[i].FriendUsername === req.params.username) & (!arr[i].accepted)){
            cand[k] = arr[i].UserUsername
            k++
          }
        }
      }

      response = {
        user: userfound.dataValues,
        friendlist: friends,
        friendwant: cand
      }

      res.status(200).send(response)

    })
 })
}

module.exports.update = (req, res) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  models.User.findById(req.user.username, {include: [models.Event]}).then((userfound) => {
      userfound.update(req.body).then(() => {
        /*response = {
          user: userfound.dataValues
        }*/
        res.status(200).send('done')
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
}

module.exports.delete = (req, res) => {
  models.User.findById(req.user.username).then((userfound) => {
    models.Comment.destroy({where: {UserUsername: req.user.username}})
    models.Participation.findAll({where: {UserUsername: req.user.username, created: true}}).then((arr) => {
      var list = []
      for (var i = 0; i < arr.length; i++) {
        list[i] = arr[i].EventEventid
      }
      models.Comment.destroy({where: {EventEventid: list}})
      models.Event.destroy({where: {eventid: list}})
    })
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
  console.log(req.body.username);
    models.Friendship.findOne({where: {
    $and: [
      {
        FriendUsername: req.user.username
      },
      {
        UserUsername: req.body.username
      }
    ]
  }}).then((val) => {
      val.update({accepted: true}).then(() => {
        res.status(200).send('done')
      })
    })
  .catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.deny = (req, res) => {
  console.log('body here');
  console.log(req.query.username);
  models.Friendship.findOne({where: {UserUsername: req.query.username}}).then((val) => {
    val.destroy()
    res.status(200).send('done')
  }).catch((error) => {
    res.status(500).send(error)
  })
}
