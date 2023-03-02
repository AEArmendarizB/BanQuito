'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransferenciasSchema = Schema({
    cedula: Number,
    numero_Transaccion:String,
    cuenta_Remitente: String,
    cuenta_Destino: String,
    monto:Number,
    costo:Number,
});
module.exports = mongoose.model('Transferencia', TransferenciasSchema);