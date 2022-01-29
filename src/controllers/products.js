const products = require('../models/products');

//Obtener todos los productos
const readProducts = async (req, res) => {
  const getProducts = await products.getAll();
  res.json({ok: true, products: getProducts});
};

//Obtener producto por id
const readProductById = async (req, res) => {
  const {id} = req.params;
  const productById = await products.getById(JSON.parse(id));

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
  await products.save(product);

  res.redirect("/admin");
};

//Editar producto por id
const updateProduct = async (req, res) => {
  const {id} = req.params;
  const newProduct = req.body;
  newProduct.price = parseInt(newProduct.price)
  await products.update(JSON.parse(id), newProduct);

  res.json({ok: true, product: newProduct});
};

//Eliminar producto por id
const deleteProduct = async (req, res) => {
  const {id} = req.params;
  await products.deleteById(JSON.parse(id));

  res.json({ok: true});
};

module.exports = {
  readProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct
};