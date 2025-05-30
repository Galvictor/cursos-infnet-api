const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API da Plataforma de Cursos funcionando com Sequelize!');
});

module.exports = app;
