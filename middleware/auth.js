const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token requerido'});

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