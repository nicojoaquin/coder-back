const express = require('express');
const http = require('http')
const path = require('path');
const socketConnection = require('./helper/io');

const app = express();
const server = http.createServer(app);

require('dotenv').config()
const PORT = process.env.PORT || 4000;

//...........Settings.............

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//...........Settings.............

// Socket IO 
socketConnection(server)

//Routes
app.use('/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.get('*', (req, res) => {
  res.render('pages/404')
})

//Server
server.listen(PORT, () => {
    console.log(`Server en http://localhost:${server.address().port}`);
});

//Error
server.on('error', error => console.log(`Error en el servidor ${error}`));

