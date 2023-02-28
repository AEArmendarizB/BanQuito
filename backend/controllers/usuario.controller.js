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
    getUsuario: function (req, res) {
        var params = req.body;
        var cedula = params.cedula;
        Usuario.findOne({ "cedula": cedula }, (err, usuario) => {
            if (err) return res.status(200).send({message:500});
            if (!usuario) return res.status(200).send({message:404});
            return res.status(200).send(usuario);
        })
    },

    login: function(req, res){

        var params = req.body;
        console.log(params)

        var session = req.session;
        console.log(session)

        Usuario.findOne(params, (err, usuario) => {
            if (err) return res.status(200).send({ message: 0 });
            if (!usuario) return res.status(200).send({ message: 1 });
            session.req.session;
            session.username= req.body.username;
            //session.password= req.body.password;
            session.cedula= usuario.cedula;


            return res.status(200).send({ message: usuario.isNew , cedula: usuario.cedula});
        })

    },

    logout: function(req, res){
        
            return res.status(200).send({ message: "Si valio"});


/*
        req.session.destroy();
        res.redirect('/login');
*/
    },
    verificarUsuario: function (req, res) {
        var params = req.body;
        console.log(params)

        Usuario.findOne(params, (err, usuario) => {
            if (err) return res.status(200).send({ message: 0 });
            if (!usuario) return res.status(200).send({ message: 1 });
            //return res.status(200).send({ message: usuario.isNew });
            return res.status(200).send({ message: usuario.isNew , cedula: usuario.cedula});
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
        usuario.otp = params.otp;

        usuario.save((err, usuarioGuardado) => {
            if (err) return res.status(200).send({ message: 500 });
            if (!usuarioGuardado) return res.status(200).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        })

    },
    configurarCuenta: function (req, res) {
        //se recibe un onbjeto->{idCuenta,cuenta}
        var params= req.body;
        var idusuario = params.idusuario
        var usuario= params.usuario
        Usuario.findOneAndUpdate({ "_id": idusuario}, usuario, { new: true }, (err, usuario) => {
            if (err) return res.status(200).send({ message: 404 });
            if (!usuario) return res.status(200).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        });
    },
    actualizarUsuario: function (req, res){
        console.log("Consola 2")
        var update=req.body;
        var cedula= update.cedula;
        update.isNew = false;
        console.log(update)

        Usuario.findOneAndUpdate({"cedula":cedula},update,{new:true},(err,usuario)=>{
            if (err) return res.status(500).send({message:'Error al actualizar los datos'});
            if(!usuario) return res.status(404).send({message:'El libro no existe para actulizar'});
            return res.status(200).send({usuario});
        })

    },


    generarCodigoOTP: function (req, res){

        var params = req.body;
        var digitos = params.digitos;
        var otp = "";

        for (let i = 0; i < digitos; i++) {

            otp += Math.floor(Math.random() * 10).toString();

        }

        return res.status(500).send({ otp });

    },

    validarUsername:function (req, res) {
        var params = req.body;
        var user = params.username;
        console.log(user);
        Usuario.findOne({ "username": user }, (err, user) => {
            if (err) return res.status(200).send({message: true});
            if (!user) return res.status(200).send({message: false});
            return res.status(200).send({message: true});
        })
    },

    verificarPregunta:function (req, res) {
        var params = req.body;
        var cedula = params.cedula;
        var pregunta = params.pregunta;
        console.log(cedula);
        console.log(params);

        
        Usuario.findOne({ "cedula": cedula }, (err, user) => {
            if (err) return res.status(200).send({message: "Error al encontar el usuario"});
            if (!user) return res.status(200).send({message: "Nose encontro el usuario"});
            if(user.pregunta == pregunta){
                return res.status(200).send({message: "true"});
            }else{
                return res.status(200).send({message: "La respuesta a la pregunta de seguridad no coincide"});
            }
        })
    }


}
module.exports = controller;