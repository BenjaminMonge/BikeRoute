var models = require('../models');


module.exports.create = (req, res) => {
  models.findById(req.params.eventid).then((eventfound) => {
    var comm = req.params.comment
    eventfound.addComments([comm], {UserUsername: req.user.username}).success(()=> {
      res.json(comm)
    })
  })
}

module.exports.edit = (req, res) => {
  newcomm = req.params.comment
  models.findById(newcomm.id).then((comm) => {
    comm.updateAttributes({content: newcomm.content}).then(() => {
      res.json(comm)
    })
  })
}

module.exports.delete = (req, res) => {
  var commid = req.params.commid
  models.findById(commid).then((comm) => {
    comm.delete().then((rows) => {
      console.log(rows)
      res.status(200)
    })
  })
}
