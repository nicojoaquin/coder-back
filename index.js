const express = require('express');
const randomProduct = require('./helper/random');
const products = require('./products');
const app = express();
const PORT = 5000;


//Routes
app.get('/', (req, res) => {
    res.send("<h1>Primer servidor</h1>")
})

app.get('/productos', async (req, res) => {
    const getProducts = await products.getAll();
    res.send(getProducts);
});

app.get('/productoRandom', async (req, res) => {
    const getProduct = await products.getById(randomProduct(1, 4));
    res.send(getProduct);
});


//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));

