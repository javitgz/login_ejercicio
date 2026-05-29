const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: 'Token requerido'});

    // Si el token viene con el formato "Bearer <token>", o separamos
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const JWT_ENCRYPT = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, JWT_ENCRYPT);
        req.usuarioId = decoded.id;
        next();
    } catch (err){
        res.status(401).json({ error: 'Token invalido o expirado'});
    }
}

module.exports = verificarToken;