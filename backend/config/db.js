const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {

    try {
        await mongoose.createConnection(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true
        })
        console.log('BD Conectada');

    } catch (error) {
        console.log(error);
        console.log('NO Conectada');
        process.exit(1) // Detenemos la app
    }
}

module.exports = conectarDB;