const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const {sequelize} = require('./models'); // Importa o sequelize inicializado

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('🟢 Banco de dados conectado com sucesso!');

        // Sincroniza os modelos com o banco de dados (se necessário)
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('🔴 Erro ao conectar ao banco de dados:', error);
    }
}

startServer();