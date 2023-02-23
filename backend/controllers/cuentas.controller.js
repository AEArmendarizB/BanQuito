'use strict'
var Cuenta = require('../models/cuenta');
var fs = require('path');
const path = require('path');
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
    saveCuenta: function (req, res) {
        var cuenta = new Cuenta();
        var params = req.body;

        cuenta.cedula = params.cedula;
        cuenta.tipo_cuenta = params.tipo_cuenta;
        cuenta.monto_inicial = params.monto_inicial;
        cuenta.ingreso_promedio = params.ingreso_promedio;
        cuenta.numero_cuenta = params.numero_cuenta;
        cuenta.state = params.state;

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
        console.log(cedula);
        Cuenta.findOne({ "numero_cuenta": numero_cuenta }, (err, guardarCuenta) => {
            if (err) return res.status(200).send(true);
            if (!guardarCuenta) return res.status(200).send(false);
            return res.status(200).send(true);
        })
    },

    transaccionInterna: async function (req, res) {
        try {
            var params = req.body;
            var monto = params.monto;
            var numeroCuenta1 = params.cuenta1;
            var numeroCuenta2 = params.cuenta2;

            console.log(params);

            var cuenta1 = await Cuenta.findOne({ "numero_cuenta": numeroCuenta1 }).exec();
            if (!cuenta1) {
                return res.status(404).send({ message: 'No se encontró la cuenta 1' });
            }

            if (cuenta1.monto_inicial <= monto) {

                return res.status(404).send({ message: 'No tienes suficientes fondos' });

            }

            /////falta el monto maximo por dia

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

}


async function actualizarCuenta(cuentaActualizada, res) {
    Cuenta.findOneAndUpdate({ "_id": cuentaActualizada._id }, cuentaActualizada, { new: true }, (err, cuenta) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar los datos' });
        if (!cuenta) return res.status(404).send({ message: 'El libro no existe para actualizar' });
        //return res.status(200).send(cuenta);
    });
}
module.exports = controller;