const express = require('express');
const { cadastrarUsuario } = require('./users.controller');
const router = express.Router();

// Rota para cadastro de usuários
router.post('/usuarios', cadastrarUsuario);

module.exports = router;