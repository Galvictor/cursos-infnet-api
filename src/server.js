const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('🟢 Banco de dados conectado com sucesso!');

        // Por enquanto sem sync(), só conexão
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('🔴 Erro ao conectar ao banco de dados:', error);
    }
}

startServer();