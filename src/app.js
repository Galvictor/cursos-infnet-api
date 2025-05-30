const express = require('express');
const app = express();
const {rateLimit} = require('express-rate-limit');
const cors = require('cors');

// Configuração do rate limiter
const limiter = rateLimit({
    windowMs: process.env.REQUEST_LIMIT_MINUTES,
    limit: process.env.REQUEST_LIMIT_MAX,
    message: {
        success: false,
        message: 'Muitas requisições, tente novamente mais tarde.'
    },
    statusCode: 429
});

// Aplicar o rate limiter a todas as rotas
app.use(limiter);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API da Plataforma de Cursos funcionando com Sequelize!');
});

module.exports = app;
