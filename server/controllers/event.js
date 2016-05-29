var models = require('../models');


exports.get = (req, res) => {
  models.Event.findById(req.params.eventid, {include: [models.User]}).then((eventfound) => {
    res.json(eventfound.dataValues)
  }).catch((error) => {
    res.status(500).send(error)
  })
}

exports.create = (req, res) => {
  models.Event.build(req.body).save().then((evtsaved) => {
    evtsaved.setUsers([req.body.username], {created: TRUE})
    res.json(evtsaved.dataValues)
  })
}

exports.participate = (req, res) => {
    models.Event.findById(req.params.eventid).then((eventfound) => {
      eventfound.addUsers([req.user.username], {created: FALSE}).success(() => {
        res.json(eventsaved.dataValues)
      })
    }).catch((error) => {
      res.status(500)
    })
  }
