const courseService = require('./courses.service');

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
}

module.exports = new CourseController();