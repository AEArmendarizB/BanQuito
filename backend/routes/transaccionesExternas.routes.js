'use strict'
var express=require('express');
var router=express.Router();
var transaccionesExternasController=require('../controllers/transaccionesExternas.controllers');
var multiparty=require('connect-multiparty');
const cuenta = require('../models/cuenta');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});


//transaccion externa
router.post('/transaccion-externa',transaccionesExternasController.transaccionExterna);
router.post('/realizar-transaccion-externa',transaccionesExternasController.realizarTransaccionExterna);
//verificar cuenta externa
router.post('/verificar-cuenta-externa',transaccionesExternasController.verificarCuentaExterna);



module.exports=router;