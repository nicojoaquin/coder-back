const express = require('express');
const products = require('./models/products');
const app = express();
const PORT = 8080;

//Comandos
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  const getProducts = await products.getAll();
  res.render('index', {products: getProducts});
});

//Routes
app.use('/api/productos', require('./router/products'));

//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));

