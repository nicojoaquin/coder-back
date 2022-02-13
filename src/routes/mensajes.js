const {Router} = require('express');
const {readMessages, readMessage, createMessage, updateMessage, deleteMessage } = require('../controllers/mensajes');

const router = Router();

//Petición GET
router.get('/', readMessages);

//Petición GET
router.get('/:id', readMessage); 

//Petición POST
router.post('/', createMessage);

//Petición PUT
router.put('/:id', updateMessage);

//Petición DELETE
router.delete('/:id', deleteMessage);

module.exports = router;