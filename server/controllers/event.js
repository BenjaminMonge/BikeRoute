var models = require('../models');


module.exports.get = (req, res) => {
  models.Event.findById(req.params.eventid, {include: [models.User]}).then((eventfound) => {
    res.json(eventfound.dataValues)
  }).catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.create = (req, res) => {
  models.Event.build(req.body).save().then((evtsaved) => {
    evtsaved.setUsers([req.body.username], {created: TRUE})
    res.json(evtsaved.dataValues)
  })
}

module.exports.participate = (req, res) => {
    models.Event.findById(req.params.eventid).then((eventfound) => {
      eventfound.addUsers([req.user.username], {created: FALSE}).success(() => {
        res.json(eventsaved.dataValues)
      })
    }).catch((error) => {
      res.status(500)
    })
  }
