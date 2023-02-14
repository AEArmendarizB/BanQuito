'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RespuestaSchema=Schema({

    respuesta: String,
    
});
module.exports=mongoose.model('Respuesta',RespuestaSchema);