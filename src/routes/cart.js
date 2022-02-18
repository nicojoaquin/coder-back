const {Router} = require('express');
const { createCart, saveProduct, getProductsInCart, deleteCart, deleteProductInCart } = require('../controllers/cart');

const router = Router();

//POST
router.post('/', createCart);

//POST
router.post('/:id/products', saveProduct);

//GET
router.get('/:id/products', getProductsInCart);

//DELETE
router.delete('/:id', deleteCart);

//DELETE
router.delete('/:id/products/:prod_id', deleteProductInCart);

module.exports = router;