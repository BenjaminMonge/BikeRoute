var models = require('../models');


module.exports.create = (req, res) => {
  models.findById(req.params.eventid).then((eventfound) => {
    var comm = req.params.comment
    eventfound.addComments([comm], {UserUsername: req.user.username}).success(()=> {
      res.json(comm)
    })
  })
}
