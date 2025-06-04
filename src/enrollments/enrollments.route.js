const express = require('express');
const router = express.Router();
const {cadastrarInscricao} = require('./enrollments.controller');

// Definindo a rota para incluir o ID do curso como parâmetro
router.post('/inscricoes/:idCurso', cadastrarInscricao);

module.exports = router;