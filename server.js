var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var passport = require('passport')
var models = require('./server/models')
var xpsession = require('express-session')

/* definiendo la ruta base de la aplicacion web*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
/* Router de express usado*/
var routes = require('./server/config/router')(app);
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
/* Se usa el storage del servidor para verificar cookies*/
app.use(bodyParser.json())
/* COnfiguracion para la autenticacion de passport*/
var pass = require('./server/config/pass')
/* Usando la sesion de passport para validar y mantener sesiones en el servidor*/
app.use(xpsession({
  secret: 'iatepie',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000, secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
