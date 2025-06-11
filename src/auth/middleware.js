const { verifyToken } = require('./jwt');

const verificarAutenticacao = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ mensagem: 'Usuário não está logado' });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Verifica o token JWT
            const usuario = verifyToken(token);
            req.usuario = usuario; // Passa o usuário autenticado para a próxima etapa
            next(); // Continua para o próximo middleware ou controller
        } catch (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = { verificarAutenticacao };