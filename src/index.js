const express = require('express');
const cors = require('cors');
const http = require('http')
const path = require('path');
const multer = require('multer');
const cloudinaryConfig = require('./config/cloudinary');
const socketConnection = require('./helper/io');
const { table } = require('./models/products');

const app = express();
const server = http.createServer(app);

require('dotenv').config()
const PORT = process.env.PORT || 4000;

//Cors
app.use(cors())

//...........Settings.............

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//...........Settings.............

//Middlewares
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb, filename) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
});
app.use(multer({storage}).array('images'));
cloudinaryConfig();

// Socket IO 
socketConnection(server)

//Routes
app.use('/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));
app.use('/api/carrito', require('./routes/cart'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/test', require('./routes/mysqlTest'));
app.get('*', (req, res) => {
  res.render('pages/404')
})

//Server
server.listen(PORT, () => {
    console.log(`Server en http://localhost:${server.address().port}`);
});

//Error
server.on('error', error => console.log(`Error en el servidor ${error}`));

