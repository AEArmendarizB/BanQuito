'use strict'
//const axios = require('axios');
var Cuenta = require('../models/cuenta');
var Transaccion = require('../models/transacciones');


var fs = require('path');
const path = require('path');
var controller = {

    transaccionExterna:  async function (req, res) {


        try {
            
            //var clientesController=require('../controllers/cliente.controller');
            
            var params = req.body;
            var monto = params.monto;
            var numeroCuenta1 = params.numeroCuenta1;
            var numeroCuenta2 = params.numeroCuenta2;
            console.log(numeroCuenta1);
            console.log(numeroCuenta2);
            console.log(monto);

            var cuenta1 = await Cuenta.findOne({ "numero_cuenta": numeroCuenta1 }).exec();
            if (!cuenta1) {
                return res.status(404).send({ message: 'No se encontró la cuenta 1' });
            }

            if (cuenta1.monto_inicial <= monto) {

                return res.status(404).send({ message: 'No tienes suficientes fondos' });

            }

            if (cuenta1.monto_maximo <= monto) {

                return res.status(404).send({ message: 'No puede transferir mas de 5000 en un solo dia' });

            }
            
            //retorna el clinte por su numero de cedula
            const cliente = await getCliente(cuenta1.cedula)
            //console.log(cliente)





            const resultado= await conexionTransaccionExterna(numeroCuenta2,monto, cliente)

           
            console.log(resultado);


            
            

            return res.status(200).send({ message: resultado , cliente});
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al procesar la transacción' });
        }
    },

    realizarTransaccionExterna:  async function (req, res) {


        var params = req.body;

        var cuenta = await Cuenta.findOne({ "numero_cuenta": params.numero_cuenta }).exec();

        //const cuenta = await buscarCuenta(params.numero_cuenta)
        
        cuenta.monto_inicial = cuenta.monto_inicial + parseInt(params.monto);
        
        //await actualizarCuenta(cuenta, res)
        console.log('exitoso')

        return res.status(200).send({ message: 'Transacción realizada con éxito' });
        

    },


    verificarCuentaExterna:  async function (req, res) {
        var params = req.body

        var cuenta = await Cuenta.findOne({ "numero_cuenta": params.numero_cuenta }).exec();

        if (!cuenta) {
            return res.status(404).send({ message: 'No se encontró la cuenta 1' });
        }

        return res.status(404).send(cuenta);

    },



}

async function actualizarCuenta(cuentaActualizada, res) {
    Cuenta.findOneAndUpdate({ "_id": cuentaActualizada._id }, cuentaActualizada, { new: true }, (err, cuenta) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar los datos' });
        if (!cuenta) return res.status(404).send({ message: 'La cuenta no existe para actualizar' });
        //return res.status(200).send(cuenta);
    });
}



async function getCliente(cedula) {

    var Cliente = require('../models/Cliente');
    
    return await Cliente.findOne({ "cedula": cedula }).exec();
    
}


async function conexionTransaccionExterna(numeroCuenta2, monto, cliente) {

   // console.log(numeroCuenta2)
    //console.log(monto)
    //console.log(cliente)

    
    const axios = require('axios');

    //const url1 = 'http://26.19.181.67:3600/verificarCuentaExterna';
    const url2 = 'http://26.19.181.67:3600/realizar-transaccion-externa';

    const params = {
      monto: monto,
      numero_cuenta: numeroCuenta2,
      //aqui el nombre de las variables depende del banco externo
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      cedula: cliente.cedula,
      correo_electronico: cliente.correo_electronico

    };
  
    try {
         /*
            

            const params = { numero_cuenta: numeroCuenta2 };
            
            const respuest1=await axios.post(url1, params);

            if(respuesta1 == "false"){

                return "La cuenta no existe"

            }else{

                const params = {
                    monto: monto,
                    numero_cuenta: numeroCuenta2,
                    //aqui el nombre de las variables depende del banco externo
                    nombres: cliente.nombres,
                    apellidos: cliente.apellidos,
                    cedula: cliente.cedula,
                    correo_electronico: cliente.correo_electronico
              
                  };

                return await axios.post(url2, params);

            }
        */


      const response = await axios.post(url2, params);
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
    
  }
 








  



module.exports = controller;