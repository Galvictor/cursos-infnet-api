const express = require('express');
const courseController = require('./courses.controller');

const router = express.Router();

// Rota para listar cursos
router.get('/cursos', (req, res) => courseController.listarCursos(req, res));

module.exports = router;