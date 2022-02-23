const { msql } = require('../config/db');

const readMessages = async (req, res) => {
  const messages = await msql.from('messages').select('*');
  res.json({ok: true, messages});
};

const readMessage = async (req, res) => {
  const {id} = req.params;
  const message = await msql.from('messages').select('*').where('id', '=', id);
  res.json({ok: true, message});
};

const createMessage = async (req, res) => {
  const message = req.body;
  await await msql.from('messages').insert(message);

  res.json({ok: true, message});
};


module.exports = {
  readMessages,
  readMessage,
  createMessage,
};