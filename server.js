var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var models = require('./server/models')

/* Definiendo el secreto para los tokens*/


/* Controladores de la la logica del negocio*/
var authController = require('./server/controllers/auth')
var userController = require('./server/controllers/user');

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

var pass = require('./server/config/pass')
/* Usando la sesion de passport para validar*/
app.use(passport.initialize())
//app.use(passport.session())

/* Rutas para los controladores*/
app.post('/api/user/create', authController.createUser)
app.post('/api/user/auth', authController.loginUser)
app.post('/api/user/get', userController.getUser)
app.post('/api/user/update', userController.updateUser)
