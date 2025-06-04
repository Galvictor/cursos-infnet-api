const {criarInscricao} = require('./enrollments.service');
const {verifyToken} = require('../auth/jwt');

const cadastrarInscricao = async (req, res) => {
    try {
        // Recupera o token do cabeçalho
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({mensagem: 'Usuário não está logado'});
        }

        const token = authHeader.split(' ')[1];
        let usuario;

        try {
            // Verifica o token JWT
            usuario = verifyToken(token);
        } catch (err) {
            return res.status(403).json({mensagem: 'Token inválido ou expirado'});
        }

        // Recupera o ID do curso da URL
        const {idCurso} = req.params;

        // Verifica se o ID do curso foi fornecido
        if (!idCurso) {
            return res.status(400).json({mensagem: 'ID do curso é obrigatório'});
        }

        // Chama o serviço para criar a inscrição
        const resultado = await criarInscricao(usuario.id, idCurso);

        if (resultado.error) {
            return res.status(resultado.status).json({mensagem: resultado.message});
        }

        return res.status(200).json({mensagem: 'Inscrição realizada com sucesso', inscricao: resultado.inscricao});
    } catch (err) {
        console.error(err);
        return res.status(500).json({mensagem: 'Erro interno no servidor'});
    }
};

module.exports = {cadastrarInscricao};