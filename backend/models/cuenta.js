'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuentaSchema = Schema({

    cedula: Number,
    tipo_cuenta: String,
    monto_inicial: Number,
    ingreso_promedio: Number,
    numero_cuenta: String,
    state: Boolean,
    monto_maximo: Number

});
module.exports = mongoose.model('Cuenta', CuentaSchema);