'use strict'
var express=require('express');
var router=express.Router();
var respuestasController=require('../controllers/respuestas.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
//router.get('/inicio',cuentasController.inicio);
//guardar una respuesta
router.get('/guardar-respuesta',respuestasController.inicio);
router.post('/guardar-respuesta',respuestasController.save);
//ver todos las respuestas
//router.get('/cuentas',cuentasController.getCuentas);

module.exports=router;