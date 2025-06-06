const express = require('express');
const router = express.Router();
const {cadastrarInscricao, cancelarInscricaoController} = require('./enrollments.controller');

// Definindo a rota para incluir o ID do curso como parâmetro
router.post('/inscricoes/:idCurso', cadastrarInscricao);

// Rota para cancelar inscrição
router.delete('/inscricoes/:idCurso', cancelarInscricaoController);

module.exports = router;