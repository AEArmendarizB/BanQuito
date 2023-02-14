
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var LoginUsuarioSchema=Schema({

    user: String,
    pass: String,
    
});
module.exports=mongoose.model('LoginUsuario',LoginUsuarioSchema);