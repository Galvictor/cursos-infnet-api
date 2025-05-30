const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
});

module.exports = Usuario;