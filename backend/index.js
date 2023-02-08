console.log("desde index.js");

const express = require('express');
const conectarDB = require('./config/db');

//CREAMOS EL SERVIDOR
const app = express();

//CONECTAR A LA BD
conectarDB();

//DEFINIR LA RUTA PRINCIPAL

//  mongodb+srv://BanQuito:<password>@cluster0.7ufvx8v.mongodb.net/test

app.get('/', (req, res) => {
    res.send('Hola Munido');
})

app.listen(4000, () => {
    console.log("El servidor esta corriendo perfectamente");
})