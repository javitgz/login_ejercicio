const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers');
const verificarToken = require('../middleware/auth');

// Registro
router.post('/registrar', usuarioController.registrar);

// Login
router.post('/login', usuarioController.login);

// Listar (protegido)
router.get('/listar', verificarToken, usuarioController.listar);

// Actualizar (protegido)
router.put('/actualizar/:id', verificarToken, usuarioController.actualizar);

// Eliminar (protegido)
router.delete('/eliminar/:id', verificarToken, usuarioController.eliminar);

module.exports = router;
