const {Router} = require('express');
const {readProducts, readProductById, createProduct, updateProduct, deleteProduct, } = require('../controllers/products');

const router = Router();

//Petición GET
router.get('/', readProducts);

//Petición GET
router.get('/:id', readProductById); 

//Petición POST
router.post('/', createProduct);

//Petición PUT
router.put('/:id', updateProduct);

//Petición DELETE
router.delete('/:id', deleteProduct);

module.exports = router;