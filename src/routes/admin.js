const express = require('express');
const { msql } = require('../config/db');
const router = express.Router();

//EJS
router.get('/', async (req, res) => {
  const products = await msql.from('products').select('*').orderBy('created_AT', 'desc');
  res.render('pages/index', {products});
});

router.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const product = await msql.from('products').select('*').where('id', '=', JSON.parse(id))

    res.render("pages/product", {product: product[0]});
  } catch (error) {  
    res.redirect('/404')
  }
}); 

router.get('/404', (req, res) => {
  res.render('404')
});

module.exports = router;