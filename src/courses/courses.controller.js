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
            const {search} = req.query; // Pegando o filtro da query string
            const cursos = await courseService.listarCursos(search);
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

            // Chama o serviço para listar os cursos do usuário
            const cursos = await courseService.listarCursosDoUsuario(usuario.id);

            return res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro ao listar cursos do usuário:', error);
            return res.status(500).json({mensagem: 'Erro ao listar cursos do usuário'});
        }
    }
}

module.exports = new CourseController();