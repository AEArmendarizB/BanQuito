'use strict'
//const axios = require('axios');
var fs = require('path');
const path = require('path');
var Cuenta = path.join('..','backend','models','cuenta');

var controller = {
    inicio: function (req, res) {
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },
    getCuentas: function (req, res) {
        Cuenta.find({}).sort().exec((err, cuentas) => {
            if (err) return res.status(500).send({ message: 'Error al recuperar los datos' });
            if (!cuentas) return res.status(404).send({ message: 'No hay usuarios para mostrar' });
            return res.status(200).send({ cuentas });
        })

    },
    getCuentaByCI: function (req, res) {
        //Se entrega la CI del cliente y retorna la cuenta (objeto) o arreglo de objetos si hay mas cuentas en el mismo usuario, si no se encuentra, que retorne el codigo de error
        console.log("Recolectando datos de las cuentas del usuario:")
        var params = req.body;
        var cedula = params.cedula;
        Cuenta.find({ "cedula": cedula }, (err, cuentas) => {
            if (err) return res.status(500).send({ message: 500 });
            if (!cuentas) return res.status(404).send({ message: 404 });
            return res.status(200).send( cuentas );
        })
    },
    saveCuenta: function (req, res) {
        var cuenta = new Cuenta();
        var params = req.body;

        cuenta.cedula = params.cedula;
        cuenta.tipo_cuenta = params.tipo_cuenta;
        cuenta.monto_inicial = params.monto_inicial;
        cuenta.ingreso_promedio = params.ingreso_promedio;
        cuenta.numero_cuenta = params.numero_cuenta;
        cuenta.state = params.state;
        cuenta.monto_maximo= 5000;

        cuenta.save((err, cuentaGuardado) => {
            if (err) return res.status(500).send({ message: 500 });
            if (!cuentaGuardado) return res.status(404).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        })

    },
    validarNumeroCuenta: function (req, res) {
        //Retorna verdadero si se encuentra una cuenta dentro de la base de datos con un numero de cuenta dado=>params, o si existe un error de conexion.
        var params = req.body;
        console.log(params);
        var numero_cuenta = params.numero_cuenta;
        //console.log(cedula);
        Cuenta.findOne({ "numero_cuenta": numero_cuenta }, (err, guardarCuenta) => {
            if (err) return res.status(200).send(true);
            if (!guardarCuenta) return res.status(200).send(false);
            return res.status(200).send(true);
        })
    },

    getCuenta: function(req,res){
        var params = req.body;
        var numero_cuenta = params.numero_cuenta;
        Cuenta.findOne({"numero_cuenta": numero_cuenta},(err, guardarCuenta)=>{
            if (err) return res.status(200).send(true);
            if (!guardarCuenta) return res.status(200).send(false);
            return res.status(200).send( guardarCuenta );
            //return res.send(guardarCuenta);
        })
    },

    transaccionInterna: async function (req, res) {
        try {
            var params = req.body;
            var monto = params.monto;
            var numeroCuenta1 = params.cuenta1;
            var numeroCuenta2 = params.cuenta2;

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
            

            var cuenta2 = await Cuenta.findOne({ "numero_cuenta": numeroCuenta2 }).exec();
            if (!cuenta2) {
                return res.status(404).send({ message: 'No se encontró la cuenta 2' });
            }

            cuenta2.monto_inicial = cuenta2.monto_inicial + parseInt(monto);
            cuenta1.monto_inicial = cuenta1.monto_inicial - parseInt(monto);

            await actualizarCuenta(cuenta1, res)
            await actualizarCuenta(cuenta2, res)

            return res.status(200).send({ message: 'Transacción realizada con éxito' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al procesar la transacción' });
        }
    },
    generarNumeroCuenta: async function (req, res) {

        try {
            var params = req.body;
            var ahorro = params.ahorro;
            var digitos = params.digitos;
            var bucle = "ture";

            var numero = null;
            var cuenta;

            do {
                if (ahorro == true) {
                    numero = '10';
                } else if(ahorro == false){
                    numero = '20';
                }
                for (let i = 0; i < digitos - 2; i++) {
                    numero += Math.floor(Math.random() * 10).toString();
                }

                cuenta = await Cuenta.findOne({ "numero_cuenta": numero }).exec();

                if (cuenta == null) {
                    //bucle = "false";
                    return res.status(200).send({ numero });
                    
                }
            } while (bucle)
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al generar el numero' });
        }
    },
    actualizarCuenta: function (req, res) {
        //se recibe un onbjeto->{idCuenta,cuenta}
        var params= req.body;
        var idCuenta = params.idCuenta
        var cuenta= params.cuenta
        console.log(idCuenta)
        Cuenta.findOneAndUpdate({ "_id": idCuenta}, cuenta, { new: true }, (err, cuenta) => {
            if (err) return res.status(200).send({ message: 404 });
            if (!cuenta) return res.status(200).send({ message: 404 });
            return res.status(200).send({ message: 200 });
        });
    },

}


async function actualizarCuenta(cuentaActualizada, res) {
    Cuenta.findOneAndUpdate({ "_id": cuentaActualizada._id }, cuentaActualizada, { new: true }, (err, cuenta) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar los datos' });
        if (!cuenta) return res.status(404).send({ message: 'La cuenta no existe para actualizar' });
        //return res.status(200).send(cuenta);
    });
}


module.exports = controller;