//Rutas
const express = require('express');
const router = express.Router();
const clienteController = require('../controlers/clienteControler');

//  api/cliente
router.post('/',clienteController.crearCliente);

module.exports = router; 