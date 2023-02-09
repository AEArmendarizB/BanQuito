const Cliente = require("../models/cliente");



exports.crearCliente = async (req, res) => {

    try {
        let clientes;
        //Creamos cliente
        clientes =  new Cliente(req.body);
        var params=req.body;
        clientes.nombres = params.nombres;
        
       await clientes.save((ab,ClienteGuardado)=>{
        if (ab) return res.status(500).send({message:'Error al guardar'});
        if(!ClienteGuardado) return res.status(404).send({message:'No se ha guardado el Cliente'});
        return res.status(200).send({libro:ClienteGuardado});
        })
       res.send(clientes);

        console.log(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

