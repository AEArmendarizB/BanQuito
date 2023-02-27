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
//verificacion opt login
router.post('/validar-email-otp',correoController.verificarCorreoLogin);

module.exports=router;