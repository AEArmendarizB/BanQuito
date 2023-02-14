'use strict'
var express=require('express');
var router=express.Router();
var respuestasController=require('../controllers/respuestas.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
//router.get('/inicio',cuentasController.inicio);
//guardar un libro
router.get('/guardar-respuesta',respuestasController.inicio);
router.post('/guardar-respuesta',respuestasController.save);
//ver todos los libros
//router.get('/cuentas',cuentasController.getCuentas);

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