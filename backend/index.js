'use strict'
var mongoose=require('mongoose');
var port='3600';
mongoose.promise=global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');
//var nodemailer = require('nodemailer');
//var express = require('express');
var app1 = require('./app');

//coneccion a la base de datos de MONGODB
 
const cors = require("cors");
app.use(cors())
//app1.use(cors())

const user = 'jojy';
const password = 'jojy';
const dbname = 'BanQuito'
const uri = `mongodb+srv://${user}:${password}@pruebas.vuuremx.mongodb.net/${dbname}?retryWrites=true&w=majority`;


mongoose.connect(uri)
.then(()=>{
    console.log("Conexion establecida con la bdd");
    app.listen(port,()=>{
        console.log("Conexion establecida en el url: localhost:3600");
    })
})
.catch(err=>console.log(err))


//Coneccion para enviar correos
app1.listen(3000,()=>{
    console.log("Servidor en -> http://localhost:3000");
});