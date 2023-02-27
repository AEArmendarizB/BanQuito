'use strict'
var express=require('express');
const router = express.Router();
const correoController = require('../controllers/correo.controller');

//  api/correo
router.post('/validar-email',correoController.validarCorreo);

router.post('/verificar-email',correoController.verificarCorreoLogin);

router.post('/bienvenido',correoController.bienvenidoBanquito);

module.exports = router; 