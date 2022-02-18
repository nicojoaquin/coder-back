const {Router} = require('express');
const {readProducts, readProductById, createProduct, updateProduct, deleteProduct, } = require('../controllers/products');
const adminValidate = require('../middlewares/admin-validate');

const router = Router();

//Petición GET
router.get('/', readProducts);

//Petición GET
router.get('/:id', readProductById); 

//Petición POST
router.post('/', adminValidate , createProduct);

//Petición PUT
router.put('/:id', adminValidate, updateProduct);

//Petición DELETE
router.delete('/:id', adminValidate, deleteProduct);

module.exports = router;