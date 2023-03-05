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
            if(i==0){
                var aux=Math.floor(Math.random()*10+1).toString();
                if(aux=="10"){
                    otp+="9";
                }
            }
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
                this.validarCorreo();
            } else {
                res.status("200");
            }

            return res.send(otp);
        }) 
    },
    actualizarCliente: function (req, res) {
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var mensaje1 = "Hola,"+'\n\n'+"Has solicitado la actualización de tu correo electrónico. Para hacerlo, simplemente proporcione el siguiente código al ascesor."+'\n\n';
        var mensaje2 = '\n\n'+"Tenga en cuenta que si no verifica su dirección de correo electrónico, su cuenta no estará completamente actualizada y no podrá acceder a todos los servicios en línea que ofrecemos."+'\n\n'+"Si tiene alguna pregunta o necesita ayuda, no dude en ponerse en contacto con nuestro equipo de soporte al cliente. Estamos disponibles las 24 horas del día para ayudarlo en todo lo que necesite."+'\n\n'+"Gracias por elegir BanQuito. Esperamos poder servirle en el futuro."+'\n\n';
        var otp = "";
        //generacion del número de validacion
        for (let i = 0; i < 6; i++) {
            if(i==0){
                var aux=Math.floor(Math.random()*10+1).toString();
                if(aux=="10"){
                    otp+="9";
                }
            }
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
            from: "Banquito - Cambio de correo <sfqaeab@gmail.com>",
            to: correo,
            subject: "Validar correo electrónico",
            text: mensaje1 + '\n' + otp+ '\n' +mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.actualizarCliente();
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
            if(i==0){
                var aux=Math.floor(Math.random()*10+1).toString();
                if(aux=="10"){
                    otp+="9";
                }
            }
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
                this.verificarCorreoLogin();
            } else {
                res.status("200");
            }
        })
        return res.send(otp);
    },
    bienvenidoBanquito: function (req, res) {
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var username = params.username;
        var pass = params.pass;
        var correo = params.correo;
        var mensaje1 = "¡Bienvenido/a a BanQuito!"+'\n\n'+"Estamos muy contentos de que hayas decidido abrir una cuenta con nosotros. Sabemos que la elección de una institución financiera es una decisión importante y estamos comprometidos en ofrecerte el mejor servicio posible.\n\nNos aseguraremos de que el proceso de apertura de cuenta sea sencillo y rápido, y que te sientas seguro/a y cómodo/a en todo momento. Queremos que te sientas en confianza al confiar en nosotros con tus finanzas.\n\nPara que puedas acceder a tu cuenta en la nuestra Banca Web utiliza estas credenciales:";
        var credenciales = "\n\n\t Username: "+username+"\n\n\t Password: "+pass;
        var mensaje2 = '\n\n'+"Tenga en cuenta que estas credenciales son temporales y debe actualizarlas ingresando por primera ves a la Banca Web.\n\nNuestro equipo de expertos en servicios financieros estará disponible para ayudarte en todo momento. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros. Nos complace ayudarte en todo lo que necesites.\n\n¡Gracias por confiar en nosotros!" ;
        
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
            from: "Banquito - Registro Exitoso <sfqaeab@gmail.com>",
            to: correo,
            subject: "Bienvenido a tu nueva Banca Web",
            text: mensaje1 + '\n' +credenciales+'\n' +mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.bienvenidoBanquito();
            } else {
                res.status("200");
            }
        })
    },
    //Caso 1
    nuevasCredencialesTemp: function(req, res){
        //Parametros
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var username = params.username;
        var pass = params.pass;
        var pregunta = params.pregunta;
        var mensaje1 = "Estimado cliente,"+'\n\n'+"BanQuito le informa: a las "+getTime()+" se han solicitado el reseteo de sus credenciales para acceder a la Banca Web. \n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente.\n\nPara que puedas acceder a tu cuenta en la nuestra Banca Web utiliza estas credenciales:";
        var credenciales = "\n\n\t Username: "+username+"\n\n\t Password: "+pass+"\n\n\t Pregunta: "+pregunta;
        var mensaje2 = '\n\n'+"Tenga en cuenta que estas credenciales son temporales y debe actualizarlas ingresando por primera ves a la Banca Web.\n\nNuestro equipo de expertos en servicios financieros estará disponible para ayudarte en todo momento. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros. Nos complace ayudarte en todo lo que necesites.\n\n¡Gracias por confiar en nosotros!" ;
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
            from: "Banquito - Nuevas Credenciales <sfqaeab@gmail.com>",
            to: correo,
            subject: "Se ha generado sus nuevas credenciales",
            text: mensaje1+credenciales+mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.nuevasCredencialesTemp();
            } else {
                res.status("200");
            }
        })
    },
    //Caso 2
        //No se envia correo
    //Caso 3
    actualizarUsuario: function (req, res) {
        //Parametros
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var mensaje1 = "Estimado cliente,"+'\n\n'+"BanQuito le informa: a las "+getTime()+" se han actualizado sus credenciales para acceder a la Banca Web. \n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente";
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
            from: "Banquito - Actualización Exitoso <sfqaeab@gmail.com>",
            to: correo,
            subject: "Tus credenciales están al día",
            text: mensaje1
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.actualizarUsuario();
            } else {
                res.status("200");
            }
        })
    },
    //caso 4
    reenviar:function (req, res){
        //Parametros
        var nodemailer = require('nodemailer');
        var params = req.body;
        var username = params.username;
        var pass = params.pass;
        var correo = params.correo;
        var pregunta = params.pregunta;
        var credenciales = "\n\n\t Username: "+username+"\n\n\t Password: "+pass+"\n\n\t Pregunta: "+pregunta;
        var mensaje1 = "Estimado cliente,"+'\n\n'+"BanQuito le informa: a las "+getTime()+" se ha solicitado el reenvio de sus creedenciales para acceder a la Banca Web.\n\nPara que puedas acceder a tu cuenta en la nuestra Banca Web utiliza estas credenciales:";
        var mensaje2 = '\n\n'+"Tenga en cuenta que estas credenciales son temporales y debe actualizarlas ingresando por primera ves a la Banca Web.\n\nNuestro equipo de expertos en servicios financieros estará disponible para ayudarte en todo momento. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros. Nos complace ayudarte en todo lo que necesites.\n\n¡Gracias por confiar en nosotros!" ;
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
            from: "Banquito - Condifencial <sfqaeab@gmail.com>",
            to: correo,
            subject: "Reenvio de credenciales",
            text: mensaje1+credenciales+mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.reenviar();
            } else {
                res.status("200");
            }
        })
    },
    actualizar: function (req, res) {
        //Parametros
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var mensaje1 = "Estimado cliente,"+'\n\n'+"BanQuito le informa: a las "+getTime()+" se han actualizado sus datos. \n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente";
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
            from: "Banquito - Actualización Exitoso <sfqaeab@gmail.com>",
            to: correo,
            subject: "Tus credenciales están al día",
            text: mensaje1
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
                res.status(500).send(error.message);
                this.actualizar();
            } else {
                res.status("200");
            }
        })
    },
    confirmarTransferencia: function(req, res){
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var mensaje1 = "Estimado Cliente"+'\n\n'+"BanQuito le informa que a las: "+getTime()+ "se ha solicitado una petición para efectuar una trnasferencia. Su código para la Banca Virtual es: \n\n "
        var mensaje2= "\n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente"; 
        var otp = "";
        console.log(params);
        //fecha y hora
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
        //generacion del número de validacion
        for (let i = 0; i < 6; i++) {
            if(i==0){
                var aux=Math.floor(Math.random()*10+1).toString();
                if(aux=="10"){
                    otp+="9";
                }
            }
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
            from: "Banquito - Confirmar Transferencias <sfqaeab@gmail.com>",
            to: correo,
            subject: "Transferencia Interna",
            text: mensaje1+otp+mensaje2
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
                this.validarCorreo();
            } else {
                res.status("200");
            }

            return res.send(otp);
        }) 
    },
    transferenciaExitosa: function(req, res){
        //parametros 
        var nodemailer = require('nodemailer');
        var params = req.body;
        var correo = params.correo;
        var cuenta1 = params.cuenta1;
        var cuenta2 = params.cuenta2;
        var monto = params.monto;
        var descripcion = params.descripcion;
        var mensaje = "";
        console.log(params);
        cuenta2 = cuenta2.substr(0,2)+"XXXXXX"+cuenta2.substr(8);
        cuenta1 = cuenta1.substr(0,2)+"XXXXXX"+cuenta1.substr(8);

        mensaje = "Estimado Cliente"+'\n\n'+"BanQuito le informa que a las: "+getTime()+ "se ha realizado un movimiento en su banca web."+
            "A continuación, se detallan los detalles de su transacción: "+'\n\n'+"Cuenta Destino: "+cuenta2+"\nCuenta Origen: "+cuenta1+
            "\nMonto transferido: $"+monto+"\nConcepto de la transferencia: "+descripcion+ "\n\n Si no realizó esta acción, por favor póngase en contacto con nuestro equipo de soporte al cliente"; ;
        //fecha y hora
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
            from: "Banquito - Resumen <sfqaeab@gmail.com>",
            to: correo,
            subject: "Transferencia Interna Realizada",
            text: mensaje
        }
        //enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status("200");
            }
        }) 
    }
}
module.exports = controller;