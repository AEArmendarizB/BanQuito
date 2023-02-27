'use strict'
var express=require('express');
var router=express.Router();
var clientesController=require('../controllers/cliente.controller');
var correoController= require('../controllers/correo.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
router.get('/inicio',clientesController.inicio);
//guardar una cuenta
router.post('/guardar-cliente',clientesController.saveCliente);
//ver todas las cuentas
router.get('/clientes',clientesController.getClientes);
//obtener Cliente
router.post('/cliente',clientesController.getCliente);
//validar cedula
router.post('/validarCedula',clientesController.validarCedula);
//actualizar Cliente
router.post('/actualizar-cliente',clientesController.actualizarCliente);
//validar email
router.post('/validar-email',correoController.validarCorreo);
//validar email login
router.post('/verificar-email',correoController.verificarCorreoLogin);

module.exports=router;