'use strict'
var express=require('express');
var router=express.Router();
var usuariosController=require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});

//login usuario
//router.post('/login-usuario',usuariosController.login);
//logout usuario
router.get('/logoutn-usuario',usuariosController.logout);

//guardar un usuario
router.post('/guardar-usuario',usuariosController.saveUsuario);
//velidar el usuario
router.post('/verificar-usuario',usuariosController.verificarUsuario);
//generar codigo otp
router.post('/generarCodigoOTP',usuariosController.generarCodigoOTP);
//actualizar un usuario
router.post('/actualizarUsuario',usuariosController.actualizarUsuario);



module.exports=router;