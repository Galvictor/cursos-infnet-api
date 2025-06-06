const sequelize = require('../config/db');
const Curso = require('../courses/courses.model');
const Usuario = require('../users/users.model');
const Inscricao = require('../enrollments/enrollments.model');

// Executar associações
Curso.associate();
Inscricao.associate();

module.exports = {
    sequelize,
    Curso,
    Usuario,
    Inscricao
};