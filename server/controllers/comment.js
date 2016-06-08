var models = require('../models');


module.exports.create = (req, res) => {
  console.log(req.body.datePosted);
  var comm = {
    content: req.body.content,
    datePosted: req.body.datePosted,
    EventEventid: req.body.eventid,
    UserUsername: req.user.username
  }
  models.Comment.build(comm).save().then((commsav) =>{
    res.status(200).send(commsav)
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
