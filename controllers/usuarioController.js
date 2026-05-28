const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({ mensaje: 'Usuario creado', usuario });
    } catch(err){
        res.status(400).json({ error: err.message});
    }
};

exports.login = async (req, res) => {

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valido = await usuario.compararPassword(password);
    if (!valido) return res.status(401).json({ error: 'Credenciales incorrectas'});

    // Generar token JWT
    const JWT_ENCRYPT = process.env.JWT_SECRET;
    const token = jwt.sign({id: usuario._id}, JWT_ENCRYPT, { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token });

};

exports.listar = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

exports.actualizar = async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(usuario)
}

exports.eliminar = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({mensaje: 'Usuario eliminado'});
}