const Cliente = require("../models/cliente");



var controler={
crearCliente : async (req, res) => {

    try {
        let cliente;
        //Creamos cliente
        cliente =  new Cliente();
        var params=req.body ;
        cliente.nombres = params.nombres;
        /*cliente.apellidos = params.apellidos;
        cliente.cedula = params.cedula;
        cliente.codigo_dactilar = params.codigo_dactilar;
        cliente.fecha_nacminiento = params.fecha_nacminiento;
        cliente.correo_electronico = params.correo_electronico;
        cliente.direccion = params.direccion;
        cliente.ocupacion = params.ocupacion;
        cliente.numero_telefono = params.numero_telefono;
        */console.log(cliente);

        
       await cliente.save((err, clienteGuardado)=>{
        if (err) return res.status(404).send({message:"error"+err});
        return res.status(200).send({cliente:clienteGuardado});
       });
       

        console.log(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

},
getClientes:function(req,res){
    Cliente.find({}).sort().exec((err,clientes)=>{
        if (err) return res.status(404).send({message:"error"+err});
        return res.status(200).send({clientes});
    })
    
}
}
module.exports=controler;