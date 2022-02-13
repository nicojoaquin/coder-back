const Product = require('../models/product');

//Obtener todos los productos
const readProducts = async (req, res) => {
  const getProducts = await Product.getAll();
  res.json({ok: true, products: getProducts});
};

//Obtener producto por id
const readProductById = async (req, res) => {
  const {id} = req.params;
  const productById = await Product.getById(JSON.parse(id));

  if(!productById) {
    res.status(404).json({
      ok: false,
      msg: "No se encuentra el producto"
    })
  }
  
  res.json({ok: true, product: productById});
};

//Agregar un producto
const createProduct = async (req, res) => {
  const product = req.body;
  product.price = parseInt(product.price)
  await Product.save(product);

  res.json({ok: true, product});
};

//Editar producto por id
const updateProduct = async (req, res) => {
  const {id} = req.params;
  const newProduct = req.body;
  newProduct.price = parseInt(newProduct.price)
  await Product.update(JSON.parse(id), newProduct);
  const allProducts = await Product.getAll();

  res.json({ok: true, products: allProducts, product: newProduct});
};

//Eliminar producto por id
const deleteProduct = async (req, res) => {
  const {id} = req.params;
  await Product.deleteById(JSON.parse(id));
  const allProducts = await Product.getAll();

  res.json({ok: true, products: allProducts});
};

module.exports = {
  readProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct
};