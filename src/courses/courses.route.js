const express = require('express');
const courseController = require('./courses.controller');
const {verificarAutenticacao} = require('../auth/middleware');

const router = express.Router();

// IMPORTANTE: Rota específica deve vir antes da rota com parâmetro
router.get('/cursos/me', verificarAutenticacao, (req, res) => courseController.listarCursosDoUsuario(req, res));

// Rota para listar cursos (sem autenticação)
router.get('/cursos', (req, res) => courseController.listarCursos(req, res));
// Rota com userId específico
router.get('/cursos/:userId', verificarAutenticacao, (req, res) => courseController.listarCursos(req, res));

module.exports = router;