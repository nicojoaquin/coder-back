const express = require('express');
const { knex } = require('../config/db');
const router = express.Router();

//EJS
router.get('/', async (req, res) => {
  const products = await knex.from('products').select('*');
  res.render('pages/index', {products});
});

router.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const product = await knex.from('products').select('*').where('id', '=', JSON.parse(id))

    res.render("pages/product", {product: product[0]});
  } catch (error) {  
    res.redirect('/404')
  }
}); 

router.get('/404', (req, res) => {
  res.render('404')
});

module.exports = router;