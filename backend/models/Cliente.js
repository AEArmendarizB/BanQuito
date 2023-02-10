const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    }/*,
    apellidos: {
        type: String,
        required: true
    },
    cedula: {
        type: Number,
        required: true
    },
    codigo_dactilar: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    correo_electronico: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ocupacion: {
        type: String,
        required: true
    },
    numero_telefono: {
        type: String,
        required: true
    }*/
});

module.exports = mongoose.model('Clientes', ClienteSchema);