'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransferenciaSchema = Schema({
    //Datos del emisor
    cuentaEmisor: Number,
    nombresEmisor: String,
    apellidosEmisor: String,
    tipo_cuentaEmisor: String,
    monto: Number,
    descripcion:String,
    //Datos del receptor
    cuentaReceptor: Number,
    nombresReceptor: String,
    apellidosReceptor: String,
    tipo_cuentaReceptor: String
});

module.exports = mongoose.model('Transferencia', TransferenciaSchema);