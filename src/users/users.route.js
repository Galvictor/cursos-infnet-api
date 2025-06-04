const express = require('express');
const {cadastrarUsuario, loginUsuario} = require('./users.controller');
const router = express.Router();

// Rota para cadastro de usuários
router.post('/usuarios', cadastrarUsuario);

// Rota para login de usuários
router.post('/usuarios/login', loginUsuario);

module.exports = router;