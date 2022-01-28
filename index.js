const express = require('express');
const app = express();
const PORT = 8080;

//Comandos
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/api/productos', require('./router/productos'));

//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));

