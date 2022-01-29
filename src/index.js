const express = require('express');
require('dotenv').config()

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//Comandos

//EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/pages');

//Express
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));

//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

//Error en servidor
server.on('error', error => console.log(`Error en el servidor ${error}`));

