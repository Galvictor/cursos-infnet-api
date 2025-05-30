const sequelize = require('./config/db');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('🔴 Erro ao conectar com o banco de dados:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();