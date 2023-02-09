console.log("desde index.js");

const express = require('express');
const conectarDB = require('./config/db');


//CREAMOS EL SERVIDOR
const app = express();

//CONECTAR A LA BD
conectarDB();

app.use(express.json());

app.use('/api/cliente', require('./routes/cliente'));

app.listen(4000, () => {
    console.log("El servidor esta corriendo perfectamente");
})