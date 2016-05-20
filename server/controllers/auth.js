var models = require('../models')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var jwt = require('jsonwebtoken');

function createToken(user) {
  return jwt.sign(user.dataValues, 'iatepie', { expiresIn: 18000 });
}

module.exports.createUser = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password= hash;
        models.User.build(req.body).save().then(function (membersaved) {
          res.status(201).send({
            id_token: createToken(membersaved)
          })
        }).catch(function (error) {
            console.log(error)
            res.statusCode = 400
            res.send('User already exists')
        })

    })
  })
}

module.exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var error = err || info;
    if (error) { return res.status(400).json(error) }
    req.logIn(user, (err) => {
      if (err) { return res.send(err) }
      models.User.findById(user.username).then((userfound) => {
        res.status(201).send({
          id_token: createToken(userfound)
        })
      })
    });
  })(req, res, next);
}
