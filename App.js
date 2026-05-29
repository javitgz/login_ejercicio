require('dotenv').config(); // importa las variables del entorno
const express = require('express');
const mongoose = require('mongoose');
const usuarioRouter = require('./routes/usuarios');

const app = express();
app.use(express.json());

// URI desde variables .env
const server = process.env.DB_SERVER; 
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const mongoURI = `mongodb://${server}:${dbPort}/${dbName}`;

// Conexion a MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));


// Rutas
app.use('/usuarios', usuarioRouter);

// Puerto del servidor .env
const appPort = process.env.SERVER_PORT;
app.listen(appPort, () => {
    console.log(`Servidor en puerto ${appPort} OK`);
});