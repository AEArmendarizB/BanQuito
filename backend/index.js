console.log("desde index.js");

const express = require('express');
const conectarDB = require('./config/db');
var bodyParser=require('body-parser');


//CREAMOS EL SERVIDOR
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{    res.header('Access-Control-Allow-Origin','*');    
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')    
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');    
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');    
    next();})
//CONECTAR A LA BD
conectarDB();

//app.use(express.json());

app.use('/', require('./routes/cliente'));

app.listen(4000, () => {
    console.log("El servidor esta corriendo perfectamente");
})