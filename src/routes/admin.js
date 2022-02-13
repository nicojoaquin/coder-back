const express = require('express');
const Product = require('../models/product');
const router = express.Router();

//EJS
router.get('/', async (req, res) => {
  const getProducts = await Product.getAll();
  res.render('pages/index', {products: getProducts});
});

router.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const productById = await Product.getById(JSON.parse(id));
    res.render("pages/product", {product: productById});
  } catch (error) {  
    res.redirect('/404')
  }
}); 

router.get('/404', (req, res) => {
  res.render('404')
});

module.exports = router;