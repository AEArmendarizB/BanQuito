'use strict'
var express=require('express');
var router=express.Router();

var transferenciaControler = require('../controllers/cliente.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});


module.exports=router;