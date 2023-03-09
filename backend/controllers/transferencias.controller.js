'use strict'
var Transferencia = require('../models/transferencia');
var fs = require('path');
const path = require('path');

var controller = {
    saveTransferencia:function(req, res){
        var transferencia =new Transferencia();
        var params = req.body;
        transferencia.cuentaEmisor = params.cedulaEmisor;
        transferencia.tipo_cuentaEmisor = params.tipo_cuentaEmisor;
        transferencia.nombresEmisor = params.nombresEmisor;
        transferencia.apellidosEmisor = params.apellidosEmisor;
        transferencia.monto = params.monto;
        transferencia.cuentaReceptor = params.cedulaReceptor;
        transferencia.tipo_cuentaReceptor = params.tipo_cuentaReceptor;
        transferencia.nombresReceptor = params.nombresReceptor;
        transferencia.apellidosReceptor = params.apellidosReceptor;
        transferencia.save((err, clienteGuardado) => {
            if (err) return res.status(500).send({ message: 500 });
            if (!clienteGuardado) return res.status(404).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        })
    }
}

module.exports = controller;