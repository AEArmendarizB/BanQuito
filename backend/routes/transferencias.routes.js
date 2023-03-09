'use strict'
var express=require('express');
var router=express.Router();

var transferenciaControler = require('../controllers/transferencias.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});

//Guardar transferencias
router.post('/guardar-transferencia',transferenciaControler.saveTransferencia);

module.exports=router;