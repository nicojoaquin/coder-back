const express = require('express');
const products = require('./models/products');
const randomProduct = require('./helper/random');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.get('/', (req, res) => {
    res.send("<h1>Primer servidor</h1>")
})

app.get('/productos', async (req, res) => {
    const getProducts = await products.getAll();
    
    res.json(getProducts);
});

app.get('/productos/:id', async (req, res) => {
    const {id} = req.params;
    const getProduct = await products.getById(JSON.parse(id));

    res.json(getProduct);
}); 

app.get('/productoRandom', async (req, res) => {
    const getProduct = await products.getById(randomProduct(1, 3));

    res.json(getProduct);
});

app.post('/productos', async (req, res) => {
    const product = req.body;
    await products.save(product);

    res.json({msg: "ok", product});
});

app.put('/productos/:id', async (req, res) => {
    const {id} = req.params;
    const newProduct = req.body;
    await products.update(JSON.parse(id), newProduct);

    res.json({msg: "ok", newProduct});
});

app.delete('/productos/:id', async (req, res) => {
    const {id} = req.params;
    await products.deleteById(JSON.parse(id));

    res.json({ok: true});
});


//Server
const server = app.listen(PORT, () => {
    console.log(`Server en ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));

