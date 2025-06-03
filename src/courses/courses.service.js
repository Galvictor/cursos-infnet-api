const Curso = require('./courses.model');

class CourseService {
    /**
     * Retorna a lista de todos os cursos disponíveis.
     * @returns {Promise<Array>} Lista de cursos.
     */
    async listarCursos() {
        try {
            const cursos = await Curso.findAll();
            return cursos.map(curso => {

                // Formatando a data de início do curso no formato dd/mm/aaaa
                const dataFormatada = curso.data_inicio_curso
                    ? new Date(curso.data_inicio_curso).toLocaleDateString('pt-BR')
                    : null;

                return {
                    id: curso.id,
                    nome: curso.nome,
                    descricao: curso.descricao,
                    capa: curso.capa,
                    inicio: dataFormatada,
                    inscricoes: 0,
                    inscrito: false
                };
            });
        } catch (error) {
            console.error("Erro ao buscar cursos", error);
            throw new Error("Erro ao buscar cursos");
        }
    }
}

module.exports = new CourseService();