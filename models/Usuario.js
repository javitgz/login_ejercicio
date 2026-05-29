const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Modelo de base de datos
const usuarioSchema = new mongoose.Schema({
    documento: {type: String, required: true, unique: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido']
    },
    password: {type: String, required: true}
});

// Proceso intermedio de encriptación de contraseña antes de guardarla
usuarioSchema.pre('save', async function () {
    // Si la contaseña no cambio, salimos de la funcion
    if (!this.isModified('password')) return;
    // Encriptamos y guardamos en el mismo documento
    this.password = await bcrypt.hash(this.password, 10);
});

// Metodo para compara contraseñas
usuarioSchema.methods.compararPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);