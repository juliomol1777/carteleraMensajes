const express = require('express');
const app = express();
const corse = require('cors');

//el archivo app.js es nuestro servidor
//setting
// asigna el port en la variable de entorno port de .env y si no existe le asigna el port 4000
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(corse());
app.use(express.json());


//routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))

module.exports = app;