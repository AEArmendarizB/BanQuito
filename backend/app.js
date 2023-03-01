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
//var respuestasRoutes=require('./routes/respuestas.routes');

//para correos
var enviarCorreo=require('./routes/correo.routes');

//para transacciones externas
var transaccionesExternasRoutes=require('./routes/transaccionesExternas.routes');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//rutas
/*app.get('/',(req,res)=>{
    res.status(404).send(
        "<h1>Hola, bienvenido</h1>"
    )
})*/


//agregado para las seciones
var sessions=require('express-session');
const cookieParser = require('cookie-parser');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "miclave1234564asdasdvfgcdfgvszdfsdfdsf",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
 
app.use(cookieParser());


app.use('/',usuariosRoutes);
app.use('/',clientesRoutes);
app.use('/',enviarCorreo);
app.use('/',cuentasRoutes);
app.use('/',transaccionesExternasRoutes);
module.exports=app;
