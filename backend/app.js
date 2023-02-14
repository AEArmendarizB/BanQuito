'use strict'
var express=require('express');
var bodyParser=require('body-parser');
var app=express();

//para clientes
var clientesRoutes=require('./routes/clientes.routes');

//para el usuario
var usuariosRoutes=require('./routes/usuarios.routes');

//para las cuentas
var cuentasRoutes=require('./routes/cuentas.routes');

//para respuesta
var respuestasRoutes=require('./routes/respuestas.routes');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
/*app.get('/',(req,res)=>{
    res.status(404).send(
        "<h1>Hola, bienvenido</h1>"
    )
})*/


app.use('/',usuariosRoutes);



app.use('/',clientesRoutes);

app.use('/',cuentasRoutes);
app.use('/',respuestasRoutes);
module.exports=app;
