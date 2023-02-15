'use strict'
var express=require('express');
var router=express.Router();
var clientesController=require('../controllers/cliente.controller');
var multiparty=require('connect-multiparty');
var mutipartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de inicio
router.get('/inicio',clientesController.inicio);
//guardar un libro
router.post('/guardar-cliente',clientesController.saveCliente);
//ver todos los libros
router.get('/clientes',clientesController.getClientes);

//validar cedula
router.post('/validarCedula',clientesController.validarCedula);


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