const {criarInscricao, cancelarInscricao} = require('./enrollments.service');
const {verifyToken} = require('../auth/jwt');

const cadastrarInscricao = async (req, res) => {
    try {
        // O `req.usuario` vem do middleware
        const usuarioId = req.usuario.id;
        const {idCurso} = req.params;

        if (!idCurso) {
            return res.status(400).json({mensagem: 'ID do curso é obrigatório'});
        }

        const resultado = await criarInscricao(usuarioId, idCurso);

        if (resultado.error) {
            return res.status(resultado.status).json({mensagem: resultado.message});
        }

        return res.status(200).json({mensagem: 'Inscrição realizada com sucesso', inscricao: resultado.inscricao});
    } catch (err) {
        console.error(err);
        return res.status(500).json({mensagem: 'Erro interno no servidor'});
    }
};


const cancelarInscricaoController = async (req, res) => {
    try {
        // O `req.usuario` vem do middleware
        const usuarioId = req.usuario.id;
        const {idCurso} = req.params;

        if (!idCurso) {
            return res.status(400).json({mensagem: 'ID do curso é obrigatório'});
        }

        const resultado = await cancelarInscricao(usuarioId, idCurso);

        if (resultado.error) {
            return res.status(resultado.status).json({mensagem: resultado.message});
        }

        return res.status(200).json({mensagem: resultado.message});
    } catch (err) {
        console.error(err);
        return res.status(500).json({mensagem: 'Erro interno no servidor'});
    }
};


module.exports = {cadastrarInscricao, cancelarInscricaoController};
