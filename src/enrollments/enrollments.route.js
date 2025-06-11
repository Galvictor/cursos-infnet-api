const express = require('express');
const router = express.Router();
const {cadastrarInscricao, cancelarInscricaoController} = require('./enrollments.controller');
const {verificarAutenticacao} = require('../auth/middleware');

// Definindo a rota para incluir o ID do curso como parâmetro
router.post('/inscricoes/:idCurso', verificarAutenticacao, cadastrarInscricao);

// Rota para cancelar inscrição
router.delete('/inscricoes/:idCurso', verificarAutenticacao, cancelarInscricaoController);

module.exports = router;