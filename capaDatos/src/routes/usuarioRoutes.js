const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para los usuarios
router.post('/', usuarioController.createUsuario);
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

// Rutas adicionales para registro de usuario y gestión de roles
router.post('/register', usuarioController.registerUser);
router.post('/login', usuarioController.login);
router.get('/roles', usuarioController.getRoles);
router.post('/roles', usuarioController.createRole);
router.post('/assign-role', usuarioController.assignRole);

module.exports = router;
