const {Router} = require('express');
const products = require('../models/products');

const router = Router();

//EJS
router.get('/', async (req, res) => {
  const getProducts = await products.getAll();
  res.render('pages/index', {products: getProducts});
});

router.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const productById = await products.getById(JSON.parse(id));
    res.render("pages/product", {product: productById});
  } catch (error) {  
    res.redirect('/404')
  }
}); 

router.get('/404', (req, res) => {
  res.render('404')
});

//Handlebars
// router.get('/', async (req, res) => {
//   const getProducts = await products.getAll();
//   res.render('index', {products: getProducts, listExists: true});
// });

// router.get('/product/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const productById = await products.getById(JSON.parse(id));
//     res.render("partials/product", {product: productById});
//   } catch (error) {  
//     res.redirect('/404')
//   }
// }); 

// router.get('/404', (req, res) => {
//   res.render('404')
// });

//PUG
// router.get('/', async (req, res) => {
//   const getProducts = await products.getAll();
//   res.render('index', {products: getProducts, listExists: true});
// });

// router.get('/product/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const productById = await products.getById(JSON.parse(id));
//     res.render("product", {product: productById});
//   } catch (error) {  
//     res.redirect('/404')
//   }
// }); 

// router.get('/404', (req, res) => {
//   res.render('404')
// });

module.exports = router;