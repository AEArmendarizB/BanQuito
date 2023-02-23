'use strict'
var Usuario = require('../models/usuario');
var LoginUsuario = require('../models/login.usuario');
var fs = require('path');
const path = require('path');
const loginUsuario = require('../models/login.usuario');
var controller = {
    inicio: function (req, res) {
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },

    verificarUsuario: function (req, res) {
        var params = req.body;
        console.log(params)

        Usuario.findOne(params, (err, usuario) => {
            if (err) return res.status(200).send({ message: 0 });
            if (!usuario) return res.status(200).send({ message: 1 });
            return res.status(200).send({ message: usuario.isNew });
        })







    },
    saveUsuario: function (req, res) {
        var usuario = new Usuario();
        var params = req.body;

        usuario.cedula = params.cedula;
        usuario.username = params.username;

        usuario.password = params.password;
        usuario.pregunta = params.pregunta;
        usuario.isNew = params.isNew;

        usuario.save((err, usuarioGuardado) => {
            if (err) return res.status(500).send({ message: 500 });
            if (!usuarioGuardado) return res.status(404).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        })

    },
}
module.exports = controller;