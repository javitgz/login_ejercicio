const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({ mensaje: 'Usuario creado', usuario });
    } catch(err){
        res.status(400).json({ error: err.message});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const valido = await usuario.compararPassword(password);
        if (!valido) return res.status(401).json({ error: 'Credenciales incorrectas'});

            // Generar token JWT
        const JWT_ENCRYPT = process.env.JWT_SECRET;
        const token = jwt.sign({id: usuario._id}, JWT_ENCRYPT, { expiresIn: '1h' });
        res.json({ mensaje: 'Login exitoso', token });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor '.err });
    }

};

exports.listar = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        // Alerta: findByIdUpdate No ejecuta el middleware 'pre save' de bcrypt por defecto
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.eliminar = async (req, res) => {
    try {
        // Guardamos el resultado en la variable 'usuario'
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        // si la variable se carga y mongoose verifica omite el paso
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        // Si lo verifica 
        res.json({mensaje: 'Usuario eliminado'});
    } catch (err) { 
        res.status(400).json({ error: err.message} );
    }
}