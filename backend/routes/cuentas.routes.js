'use strict'
var express=require('express');
var router=express.Router();
var cuentasController=require('../controllers/cuentas.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
router.get('/inicio',cuentasController.inicio);
//guardar un libro
router.post('/guardar-cuenta',cuentasController.saveCuenta);
//ver todos los libros
router.get('/cuentas',cuentasController.getCuentas);

router.post('/validarNumeroCuenta',cuentasController.validarNumeroCuenta);

/*
//ver datos de un libro
router.get('/libro/:id',librosController.getLibro);
//eliminar un libro
router.delete('/libro/:id',librosController.deleteLibro);
//actulizar un libro
router.put('/libro/:id',librosController.updateLibro);
//agregar una imagen
router.post('/subir-imagen/:id',mutipartyMiddleWare,librosController.uploadImage);
//recuperar la imagen
router.get('/get-imagen/:imagen',librosController.getImagen);
/*router.post
router.put
router.delete
*/
module.exports=router;