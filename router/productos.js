const express = require('express');
const products = require('../models/products');

const router = express.Router();

//Obtener todos los productos
router.get('/', async (req, res) => {
  const getProducts = await products.getAll();
  
  res.json({ok: true, products: getProducts});
});

//Obtener producto por id
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const productById = await products.getById(JSON.parse(id));

  if(!productById) {
    res.status(404).json({
      ok: false,
      msg: "No se encuentra el producto"
    })
  }
  
  res.json({ok: true, product: productById});
}); 

//Agregar un producto
router.post('/', async (req, res) => {
  const product = req.body;
  product.price = parseInt(product.price)
  await products.save(product);

  res.json({ok: true, product});
});

//Editar producto por id
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const newProduct = req.body;
  await products.update(JSON.parse(id), newProduct);

  res.json({ok: true, product: newProduct});
});

//Eliminar producto por id
router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  await products.deleteById(JSON.parse(id));

  res.json({ok: true});
});

module.exports = router;