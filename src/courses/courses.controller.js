const courseService = require('./courses.service');
const {verifyToken} = require('../auth/jwt');

class CourseController {
    /**
     * Handler para listar cursos.
     * Filtra cursos com base no texto fornecido em "search" na query string.
     * @param {Object} req Requisição HTTP.
     * @param {Object} res Resposta HTTP.
     */
    async listarCursos(req, res) {
        try {
            const usuarioId = req.params.userId ? Number(req.params.userId) : null;
            const tokenUsuarioId = req?.usuario?.id ? Number(req?.usuario?.id) : null;

            if (usuarioId !== null && tokenUsuarioId !== null && usuarioId !== tokenUsuarioId) {
                return res.status(400).json({message: "Erro ao listar cursos"})

            }

            const {search} = req.query;
            const cursos = await courseService.listarCursos(usuarioId, search);
            return res.status(200).json(cursos);
        } catch (error) {
            console.error("Erro ao listar cursos", error);
            return res.status(500).json({message: "Erro ao listar cursos"});
        }
    }

    /**
     * Handler para listar cursos do usuário.
     * Requer que o usuário esteja autenticado (via token).
     * @param {Object} req Requisição HTTP.
     * @param {Object} res Resposta HTTP.
     */
    async listarCursosDoUsuario(req, res) {
        try {
            // O `req.usuario` vem do middleware
            const usuarioId = req.usuario.id;
            const cursos = await courseService.listarCursosDoUsuario(usuarioId);
            return res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro ao listar cursos do usuário:', error);
            return res.status(500).json({mensagem: 'Erro ao listar cursos do usuário'});
        }
    }

}

module.exports = new CourseController();