'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransaccionSchema = Schema({

    cedula: Number,
    nombres: String,
    apellidos: String,
    tipo_cuenta: String,
    monto: Number,

    cedulaReceptor: Number,
    nombresReceptor: String,
    apellidosReceptor: String,
    tipo_cuentaReceptor: String

});

module.exports = mongoose.model('Transaccion', TransaccionSchema);