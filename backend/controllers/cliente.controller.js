'use strict'
var Cliente = require('../models/cliente');
var fs = require('path');
const path = require('path');

var controller = {
    inicio: function (req, res) {
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },
    getClientes: function (req, res) {
        Cliente.find({}).sort().exec((err, clientes) => {
            if (err) return res.status(500).send({ message: 'Error al recuperar los datos' });
            if (!clientes) return res.status(404).send({ message: 'No hay clientes para mostrar' });
            return res.status(200).send({ clientes });
        })

    },
    saveCliente: function (req, res) {
        var cliente = new Cliente();
        var params = req.body;

        cliente.nombres = params.nombres;
        cliente.apellidos = params.apellidos;
        cliente.cedula = params.cedula;
        cliente.codigo_dactilar = params.codigo_dactilar;
        cliente.fecha_nacimiento = params.fecha_nacimiento;
        cliente.correo_electronico = params.correo_electronico;
        cliente.direccion = params.direccion;
        cliente.ocupacion = params.ocupacion;
        cliente.numero_telefono = params.numero_telefono;
        cliente.state = params.state;

        console.log(cliente);
        cliente.save((err, clienteGuardado) => {
            if (err) return res.status(500).send({ message: 500 });
            if (!clienteGuardado) return res.status(404).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        })

    },
    validarCedula: function (req, res) {
        var params = req.body;
        console.log(params);
        var cedula = params.cedula;
        console.log(cedula);
        Cliente.findOne({ "cedula": cedula }, (err, guardarcliente) => {
            if (err) return res.status(200).send(true);
            if (!guardarcliente) return res.status(200).send(false);
            return res.status(200).send(true);
        })
    },
    getCliente: function (req, res) {
        var params = req.body;
        console.log("Parametros en la funcion getCliente:");
        console.log(params);
        var cedula = params.cedula;
        Cliente.findOne({ "cedula": cedula }, (err, cliente) => {
            if (err) return res.status(200).send({message:500});
            if (!cliente) return res.status(200).send({message:404});
            return res.status(200).send(cliente);
        })
    },
    actualizarCliente: function (req, res) {
        //se recibe un onbjeto->{idCliente,cliente}
        var params= req.body;
        var idCliente = params.idCliente
        var cliente = params.cliente
        Cliente.findOneAndUpdate({ "_id": idCliente}, cliente, { new: true }, (err, cliente) => {
            if (err) return res.status(500).send({ message: 404 });
            if (!cliente) return res.status(404).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        });
    }
}

module.exports = controller;