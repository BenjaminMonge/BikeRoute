var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var passport = require('passport')
var models = require('./server/models')
var xpsession = require('express-session')
/* Controladores de la la logica del negocio*/
var session = require('./server/controllers/auth')
var auth = require('./server/config/auth')
var users = require('./server/controllers/user')
var events = require('./server/controllers/event')
/* definiendo la ruta base de la aplicacion web*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

/*  Definiendo las rutas que utilizan los componentes de Angular
para obtener archivos presentes en el servidor*/
app.use('/app', express.static(__dirname + '/app'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(bodyParser.json())

/* Inicializando el servidor y sincronizando la base de datos*/
models.sequelize.sync().then(function () {
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
/* Para las cookies*/

//var SequelizeStore = require('connect-session-sequelize')(xpsession.Storage)
/*var sequelize = new Sequelize(

)*/
app.use(bodyParser.json())
var pass = require('./server/config/pass')
/* Usando la sesion de passport para validar*/
app.use(xpsession({
  secret: 'iatepie',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000, secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

/* Rutas para los controladores*/
app.get('/auth/session', auth.ensureAuthenticated, session.session)
app.post('/auth/session', session.login)
app.delete('/auth/session', session.logout)
app.post('/auth/users', users.create)
app.get('/api/user/:username', users.get)
app.put('/api/user/:username', auth.canEdit, users.update)
app.get('/api/event/:eventid', events.get)
