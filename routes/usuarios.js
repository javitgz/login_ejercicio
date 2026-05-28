const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');

// CRUD
router.post('/registro', usuarioCtrl.registrar);
router.post('/login', usuarioCtrl.login);
router.get('/', usuarioCtrl.listar);
router.put('/:id', usuarioCtrl.actualizar);
router.delete('/:id', usuarioCtrl.eliminar);

module.exports = router;