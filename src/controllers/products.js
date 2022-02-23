const { msql } = require('../config/db');
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra');

//Obtener todos los productos
const readProducts = async (req, res) => {

 try {
  const products = await msql.from('products').select('*').orderBy('created_AT', 'desc');

  res.json({ok:true, products})
 } catch (err) {
   console.warn(err);
 }

};

//Obtener producto por id
const readProductById = async (req, res) => {
  const {id} = req.params;
  
  try {
    const product = await msql.from('products').select('*').where('id', '=', id);

    if(product.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encuentra el producto"
      })
    }
    res.json({ok: true, product: product[0]});

  } catch (err) {
    
  }
};

//Agregar un producto
const createProduct = async (req, res) => {
  const product = req.body;
  const img = req.file;

  let imagen;

  if(img) {
    const {url, public_id} = await cloudinary.uploader.upload(img.path);
    imagen = {url, public_id}
  } else {
    imagen = {url: null, public_id: null}
  }

  const newProduct = {
    ...product,
    image: imagen.url,
    imgId: imagen.public_id
  }

  const prodId = await msql.from('products').returning('id').insert(newProduct);
  console.log(prodId);

  if(img) {
    await fs.unlink(img.path);
  }
  res.json({ok: true, product: prodId[0]});
};

//Editar producto por id
const updateProduct = async (req, res) => {
  const {id} = req.params;
  const productChanges = req.body;
  const img = req.file;

  const product = await msql.from('products').select('*').where('id', '=', id);
  
  let imagen;
  
  if(img) {
    product[0].image && await cloudinary.uploader.destroy(product[0].imgId);
    const {url, public_id} = await cloudinary.uploader.upload(img.path);
    imagen = {
      url,
      public_id
    }
  } 

  const updatedProduct = {
    ...productChanges,
    image: imagen?.url ?? product[0].image,
    imgId: imagen?.public_id ?? product[0].imgId
  }

  await msql.from('products').where('id', '=', id).update(updatedProduct);

  img && await fs.unlink(img.path)
  
  res.json({ok: true, product: updatedProduct});
};

//Eliminar producto por id
const deleteProduct = async (req, res) => {
  const {id} = req.params;

  const product = await msql.from('products').select('*').where('id', '=', id)

  if(product[0]?.image) {
    await cloudinary.uploader.destroy(product[0].imgId) 
  }

  await msql.from('products').where('id', '=', id).del();

  res.json({ok: true});
};

module.exports = {
  readProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct
};