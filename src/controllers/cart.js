const {Cart} = require('../models/schema')
const { msql } = require('../config/db');

//Crea un carrito con productos vacios
const createCart = async (req, res) => {

  try {
  
    await Cart.save({
      createdAt: Date.now(),
      products: []
    });

    res.json({
      ok: true
    })

  } catch (err) {
    console.warn(err);
  }

};

//Busco el producto que quiero agregar y el carrito, y lo actualizo
const saveProduct = async (req, res) => {

  const {id} = req.params;
  const product = req.body;

  try {
    
    const cart = await Cart.getById(JSON.parse(id));
    
    if(!cart) {
      return res.status(404).json({
        ok: false,
        msg: "El carrito no existe"
      });
    }
    
    const productExist = await msql.from('products').select('*').where('id', '=', product.id);
    
    const productIsInCar = cart.products.find(product => product.id === productExist[0].id);
 
    if(productIsInCar) {
      return res.status(404).json({
        ok: false,
        msg: "El producto ya esta en el carrito"
      });
    }

    if(!productExist) {
      return res.status(404).json({
        ok: false,
        msg: "El producto no existe"
      });
    }

    cart.products.push(productExist[0]);
    
    const newCart = {
      ...cart,
      products: cart.products
    }

    await Cart.update(JSON.parse(id), newCart)

    res.json({
      ok: true,
      cart
    })
    
  } catch (err) {
    console.warn(err);
  }

}

//Obtengo todos los productos de mi carrito por el id de mi carrito
const getProductsInCart = async (req, res) => {
  const {id} = req.params;

  try {

    const cart = await Cart.getById(JSON.parse(id));

    if(!cart) {
      return res.status(404).json({
        ok: false,
        msg: "El carrito no existe"
      });
    }

    res.json({
      ok: true,
      products: cart.products
    })
    
  } catch (err) {
    console.warn(err);
  }
}

//Vacio el carrito
const deleteCart = async (req, res) => {

  const {id} = req.params;

  try {

    const cart = await Cart.getById(JSON.parse(id));

    if(!cart) {
      return res.status(404).json({
        ok: false,
        msg: "El carrito no existe"
      });
    }

    await Cart.deleteById(JSON.parse(id));

    res.json({
      ok: true
    })
    
  } catch (err) {
    console.warn(err);
  }

}

//Busco mi producto y mi carrito con sus id, filtro el array de productos y actualizo el carrito
const deleteProductInCart = async (req, res) => {

  const{id, prod_id} = req.params;

  try {

    const cart = await Cart.getById(JSON.parse(id));
    
    if(!cart) {
      return res.status(404).json({
        ok: false,
        msg: "El carrito no existe"
      });
    }
    
    const productExist = await cart.products.find(product => product.id === JSON.parse(prod_id));

    if(!productExist) {
      return res.status(404).json({
        ok: false,
        msg: "El producto no existe en el carrito"
      });
    }

    const newProducts = cart.products.filter(product => product.id != JSON.parse(prod_id));

    const newCart = {
      ...cart,
      products: newProducts
    }

    await Cart.update(JSON.parse(id), newCart);

    res.json({
      ok: true,
      cart: newCart
    })
    
  } catch (err) {
    console.warn(err);
  }


}

module.exports = {
  createCart,
  saveProduct,
  getProductsInCart,
  deleteCart,
  deleteProductInCart
};