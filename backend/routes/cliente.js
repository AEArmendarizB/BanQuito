//Rutas
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

//  api/cliente
router.post('/nuevo-cliente',clienteController.crearCliente);

router.get('/clientes',clienteController.getClientes);


module.exports = router; 