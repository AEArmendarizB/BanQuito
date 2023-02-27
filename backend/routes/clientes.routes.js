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
//validar cedula
router.post('/validarCedula',clientesController.validarCedula);
//validar email
router.post('/validar-email',correoController.validarCorreo);
//validar email login
router.post('/verificar-email',correoController.verificarCorreoLogin);
//obtener nombre de cliente a partir del numero de cedula
router.post('/get-nombre',clientesController.getClienteID);
module.exports=router;