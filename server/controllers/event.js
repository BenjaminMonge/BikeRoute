var models = require('../models');


module.exports.get = (req, res) => {
  models.Event.findById(req.params.eventid, {include: [models.User, models.Comment]}).then((eventfound) => {
    response = {
      bikeevent: eventfound.dataValues,
      participants: eventfound.Users,
      comments: eventfound.Comments
    }
    res.status(200).send(response)
  }).catch((error) => {
    res.status(500).send(error)
  })
}

module.exports.create = (req, res) => {
  if (req.file) {
    req.body.evtimage = req.file.path
  }
  route = {
    type: 'Polygon',
    coordinates: JSON.parse("["+ req.body.path + "]")
  }
  req.body.path = route
  console.log(req.body.evtimage);
  models.Event.build(req.body).save().then((evtsaved) => {
    evtsaved.setUsers([req.user.username], {created: true})
    res.json(evtsaved.dataValues)
  })
}

module.exports.participate = (req, res) => {
    models.Event.findById(req.body.eventid).then((eventfound) => {
      eventfound.addUsers([req.user.username], {created: false}).then(() => {
        res.status(200)
      })
    }).catch((error) => {
      res.status(500)
    })
  }

  module.exports.delete = ((req, res) => {
    models.Event.findById(req.params.eventid).then((eventfound) => {
      models.Comment.destroy({where: {EventEventid: req.params.eventid}})
      eventfound.destroy()
      res.status(200).send('done')
    }).catch((error) => {
      res.status(500)
    })
  })

  module.exports.getall = ((req, res) => {
    models.Event.findAll().then((allevt) => {
      res.status(200).send(allevt)
    })
  })
