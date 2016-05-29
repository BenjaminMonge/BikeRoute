/* Controladores de la la logica del negocio*/
var session = require('../controllers/auth')
var auth = require('../config/auth')
var users = require('../controllers/user')
var events = require('../controllers/event')
var comments = require('../controllers/comment')
/* Router*/
module.exports = (app) => {
  /* Rutas para los controladores*/
  /* Autenticacion y mantenimiento de sesion*/
  app.get('/auth/session', auth.ensureAuthenticated, session.session)
  app.post('/auth/session', session.login)
  app.delete('/auth/session', session.logout)
  /*CRUD del usuario existente en el sistema*/
  app.post('/api/user/:username', users.create)
  app.get('/api/user/:username', users.get)
  app.put('/api/user/:username', auth.canEdit, users.update)
  /* CRD y funcionalidad del evento*/
  app.post('/api/event/:eventid', events.create)
  app.get('/api/event/:eventid', events.get)
  app.put('/api/event/:eventid', events.participate)
  /* CUD para los comentarios*/
  app.post('/api/comment/', comments.create)
}
