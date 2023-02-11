//Rutas
const express = require('express');
const router = express.Router();
const clienteController = require('../controlers/clienteControler');

//  api/cliente
router.post('/nuevo-cliente',clienteController.crearCliente);

router.get('/clientes',clienteController.getClientes);


module.exports = router; 