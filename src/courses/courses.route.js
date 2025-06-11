const express = require('express');
const courseController = require('./courses.controller');
const {verificarAutenticacao} = require('../auth/middleware');

const router = express.Router();

// Rota para listar cursos
router.get('/cursos', verificarAutenticacao, (req, res) => courseController.listarCursos(req, res));
// Rota para listar cursos em que o usuário está inscrito
router.get('/cursos/me', verificarAutenticacao, (req, res) => courseController.listarCursosDoUsuario(req, res));


module.exports = router;