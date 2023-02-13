'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ClienteSchema=Schema({

    nombres: String, 
    apellidos:String, 
    cedula: Number, 
    codigo_dactilar: String,
    fecha_nacimiento: String,
    correo_electronico: String,
    direccion: String,
    ocupacion: String,
    numero_telefono: String
    
});
module.exports=mongoose.model('Cliente',ClienteSchema);