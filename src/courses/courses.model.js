const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Curso = sequelize.define('cursos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    capa: {
        type: DataTypes.STRING(255)
    },
    data_inicio_curso: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'cursos'
});

module.exports = Curso;