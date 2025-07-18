const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Curso = require("../courses/courses.model");
const Usuario = require("../users/users.model");

const Inscricao = sequelize.define('inscricoes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id',
            onDelete: 'CASCADE' // Aqui aplica o onDelete cascade
        }
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'id'
        }
    },
    inscrito_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    cancelado_em: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'inscricoes',
    indexes: [
        {
            unique: true,
            fields: ['id_usuario', 'id_curso']
        }
    ]
});

// Associações feitas após exportar a definição básica
Inscricao.associate = () => {
    Inscricao.belongsTo(Curso, { foreignKey: 'id_curso', as: 'curso' });
    Inscricao.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
};


module.exports = Inscricao;