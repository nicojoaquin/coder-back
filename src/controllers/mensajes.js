const Mensaje = require('../models/mensaje');

//Obtener todos los productos
const readMessages = async (req, res) => {
  const messages = await Mensaje.getAll();
  res.json({ok: true, messages});
};

//Obtener producto por id
const readMessage = async (req, res) => {
  const {id} = req.params;
  const message = await Mensaje.getById(JSON.parse(id));
  res.json({ok: true, message});
};

//Agregar un producto
const createMessage = async (req, res) => {
  const message = req.body;
  await Mensaje.save(message);

  res.json({ok: true, message});
};

//Editar producto por id
const updateMessage = async (req, res) => {
  const {id} = req.params;
  const updatedMessage = req.body;
  await Mensaje.update(JSON.parse(id), updatedMessage);
  const messages = await Mensaje.getAll();

  res.json({ok: true, messages, message: updatedMessage});
};

//Eliminar producto por id
const deleteMessage = async (req, res) => {
  const {id} = req.params;
  await Mensaje.deleteById(JSON.parse(id));
  const messages = await Mensaje.getAll();

  res.json({ok: true, messages});
};

module.exports = {
  readMessages,
  readMessage,
  createMessage,
  updateMessage,
  deleteMessage
};