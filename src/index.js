const express = require('express');
const path = require('path');
const { engine } = require ('express-handlebars');
require('dotenv').config()


//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//...........Settings.............

//HBS
// app.engine('hbs', engine({
//   extname: 'hbs'
// }));
// app.set('view engine', 'hbs')
// app.set('views', path.join(__dirname, 'views/hbs'));

//PUG
// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views/pug'));

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//...........Settings.............

//Routes
app.get('/', (req, res) => {
  res.send('<h1>Inicio</h1>')
});
app.use('/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));

//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

//Error
server.on('error', error => console.log(`Error en el servidor ${error}`));

