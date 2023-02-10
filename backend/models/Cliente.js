'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ClienteSchema=Schema({
    nombre:String,
    apellido:String,
    edad: Number,
    cedula: Number,
    
});
module.exports=mongoose.model('Cliente',ClienteSchema);