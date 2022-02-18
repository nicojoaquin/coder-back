const {Product} = require('../models/schema');
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra');

//Obtener todos los productos
const readProducts = async (req, res) => {
  const getProducts = await Product.getAll();
  res.json({ok: true, products: getProducts});
};

//Obtener producto por id
const readProductById = async (req, res) => {
  const {id} = req.params;
  const product = await Product.getById(JSON.parse(id));

  if(!product) {
    res.status(404).json({
      ok: false,
      msg: "No se encuentra el producto"
    })
  }
  
  res.json({ok: true, product});
};

//Agregar un producto
const createProduct = async (req, res) => {
  const product = req.body;
  const img = req.files[0];

  let imgArr;

  if(img) {
    const {url, public_id} = await cloudinary.uploader.upload(img.path);
    imgArr = [{
      url,
      public_id
    }]
  } else {
    imgArr = []
  }

  product.price = parseInt(product.price)

  const newProduct = {
    ...product,
    images: imgArr
  }

  await Product.save(newProduct);
  if(img) {
    await fs.unlink(img.path);
  }
  res.json({ok: true, product: newProduct});
};

//Editar producto por id
const updateProduct = async (req, res) => {
  const {id} = req.params;
  const product = req.body;
  const img = req.files[0];

  const {images} = await Product.getById((JSON.parse(id)))
  
  let imgArr;
  
  if(img) {
    const {url, public_id} = await cloudinary.uploader.upload(img.path);
    images.length > 0 && await cloudinary.uploader.destroy(images[0].public_id);
    imgArr = [{
      url,
      public_id
    }]
  } else {
    imgArr = images;
  }

  product.price = parseInt(product.price);

  const updatedProduct = {
    ...product,
    images: imgArr
  }

  await Product.update(JSON.parse(id), updatedProduct);
  if(img) {
    await fs.unlink(img.path)
  }
  const allProducts = await Product.getAll();
  res.json({ok: true, products: allProducts, product: updatedProduct});
};

//Eliminar producto por id
const deleteProduct = async (req, res) => {
  const {id} = req.params;

  const {images} = await Product.getById(JSON.parse(id));

  if(images.length > 0) {
    const deleteImgs = images.map( img => {
      cloudinary.uploader.destroy(img.public_id)
    });  
    await Promise.all(deleteImgs);
  }

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