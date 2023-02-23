'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UsuarioSchema=Schema({

    cedula:Number,
    username:String,
    password:String,
    pregunta:String,
    isNew:Boolean,
    
});
module.exports=mongoose.model('Usuario',UsuarioSchema);