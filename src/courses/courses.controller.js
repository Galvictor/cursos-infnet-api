const courseService = require('./courses.service');

class CourseController {
    /**
     * Handler para listar cursos.
     * @param {Object} req Requisição HTTP.
     * @param {Object} res Resposta HTTP.
     */
    async listarCursos(req, res) {
        try {
            const cursos = await courseService.listarCursos();
            return res.status(200).json(cursos);
        } catch (error) {
            console.error("Erro ao listar cursos", error);
            return res.status(500).json({ message: "Erro ao listar cursos" });
        }
    }
}

module.exports = new CourseController();