const {Router} = require('express');
const {readMessages, readMessage, createMessage} = require('../controllers/mensajes');

const router = Router();

//Petición GET
router.get('/', readMessages);

//Petición GET
router.get('/:id', readMessage); 

//Petición POST
router.post('/', createMessage);

module.exports = router;