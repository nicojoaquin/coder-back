const express = require('express');
const { knex } = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {

  const product = req.body;
  try {
  
    const newProduct = await knex.from('products').insert(product)

    res.json({
      ok: true,
      newProduct
    })

  } catch (err) {
    console.warn(err);
  }

});

router.get('/', async (req, res) => {

  try {
  
    const products = await knex.from('products').select('*')
    
    res.json({
      ok: true,
      products
    })

  } catch (err) {
   console.warn(err); 
  }

})

router.get('/:id', async (req, res) => {

  const {id} = req.params;

  try {
  
    const product = await knex.from('products').select('*').where('id', '=', id)
    
    res.json({
      ok: true,
      product
    })

  } catch (err) {
   console.warn(err); 
  }

})

router.put('/:id', async (req, res) => {

  const {id} = req.params;
  const productUpdated = req.body;

  try {

    await knex.from('products').where('id', '=', id).update(productUpdated)

    res.json({
      ok: true,
      product: productUpdated
    })
    
  } catch (err) {
    console.warn(err);
  }

})

router.delete('/:id', async (req, res) => {

  const {id} = req.params;

  try {

    await knex.from('products').where('id', '=', id).del()

    res.json({
      ok: true
    })
    
  } catch (err) {
    console.warn(err);
  }

})

module.exports = router;