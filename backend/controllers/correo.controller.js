'use strict'

var fs = require('path');
const path = require('path');

var controller = {
    validarCorreo: function (req, res) {
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var mensaje1 = "Hola, Bienvenido"+'\n\n'+"Gracias por registrarse en nuestro servicio bancario en línea. Para completar el proceso de registro, necesitamos verificar su dirección de correo electrónico. "+'\n\n'+"Para hacerlo, simplemente proporcione el siguiente código al ascesor."+'\n\n';
        var mensaje2 = '\n\n'+"Tenga en cuenta que si no verifica su dirección de correo electrónico, su cuenta no estará completamente activa y no podrá acceder a todos los servicios en línea que ofrecemos."+'\n\n'+"Si tiene alguna pregunta o necesita ayuda, no dude en ponerse en contacto con nuestro equipo de soporte al cliente. Estamos disponibles las 24 horas del día para ayudarlo en todo lo que necesite."+'\n\n'+"Gracias por elegir BanQuito. Esperamos poder servirle en el futuro."+'\n\n';
        var otp = "";
        //generacion del número de validacion
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10).toString();
        }
        //inicializar el correo
        console.log("Email enviado");
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sfqaeab@gmail.com',
                pass: 'uylohfcmmhhqdonk'
            },
        });
        //Redactar correo
        var mailOptions = {
            from: "Banquito - Registro Cliente <sfqaeab@gmail.com>",
            to: correo,
            subject: "Validar correo electrónico",
            text: mensaje1 + '\n' + otp+ '\n' +mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status("200");
            }

            return res.send(otp);
        }) 
    },


    verificarCorreoLogin: function (req, res) {
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var otp = "";
        //generacion del número de validacion
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10).toString();
        }

        var mensaje = "Estimado cliente,"+'\n\n'+"BanQuito le informa: a las "+getTime()+" se ha generado una solicitud para ingresar a su Banca Virtual. \n\nPor tu seguridad no compartas esta informacion con NADIE. Su código para la Banca Virtual es: \n\n "+otp+"\n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente";
        //Funcion para mostrar la fecha y hora actual para el correo
        function getTime(){
            var date = new Date();
            var hr = date.getHours(); 
            var min = date.getMinutes();
            var seg = date.getSeconds();
            var dia = date.getDay();
            var mes = date.getMonth()+1;
            var anio = date.getFullYear();

            if(dia<=9){
                dia="0"+dia;
            }
            if(hr<=9){
                hr="0"+hr;
            }
            if(min<=9){
                min="0"+min;
            }    
            if(seg<=9){
                seg="0"+seg;
            }
            var hora=hr+":"+min+":"+seg+" del "+dia+"/"+mes+"/"+anio;
            return hora;
        }
        getTime();
        //inicializar el correo
        console.log("Email enviado");
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sfqaeab@gmail.com',
                pass: 'uylohfcmmhhqdonk'
            },
        });
        //Redactar correo
        var mailOptions = {
            from: "Banquito - Ingreso a Banca Web <sfqaeab@gmail.com>",
            to: correo,
            subject: "Verificación de correo",
            text: mensaje
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(otp);
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status("200");
            }
        })
        return res.send(otp);
    }
}
module.exports = controller;