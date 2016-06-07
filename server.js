var express = require('express')
var app = express()
var path = require('path')
var passport = require('passport')
var session = require('express-session')
var models = require('./server/models');

/*  Definiendo las rutas que utilizan los componentes de Angular
para obtener archivos presentes en el servidor*/
app.use('/app', express.static(__dirname + '/app'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use('/uploads', express.static(__dirname + "/uploads"));
/* Inicializando el servidor y sincronizando la base de datos*/
models.sequelize.sync().then(function () {
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

/* Configuracion para la autenticacion de passport*/
var pass = require('./server/config/pass')
/* Usando la sesion de passport para validar y mantener sesiones en el servidor, se usa el storage del servidor para verificar cookies*/
app.use(session({
  secret: 'iatepie',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 6000000, secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

/* definiendo la ruta base de la aplicacion web*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

/* Router de express usado*/
var routes = require('./server/config/router')(app);
