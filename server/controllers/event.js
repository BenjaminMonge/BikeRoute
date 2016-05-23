var models = require('../models');


module.exports.get = (req, res) => {
  models.Event.findById(req.params.eventid, {include: [models.User]}).then((eventfound) => {
    console.log(eventfound);
    res.json(eventfound.dataValues)
  }).catch((error) => {
    res.status(500).send(error)
  })
}
