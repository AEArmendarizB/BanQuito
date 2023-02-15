'use strict'
var express=require('express');
var router=express.Router();
var usuariosController=require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});


//guardar un usuario
router.post('/guardar-usuario',usuariosController.saveUsuario);
//ver todos los usuario
router.post('/verificar-usuario',usuariosController.verificarUsuario);

module.exports=router;