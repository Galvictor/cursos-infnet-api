const {Op} = require('sequelize'); // Importando operadores para realizar buscas avançadas
const Curso = require('./courses.model');

class CourseService {
    /**
     * Retorna a lista de cursos disponíveis, opcionalmente filtrados por nome ou descrição.
     * @param {string} search Texto para filtrar os cursos.
     * @returns {Promise<Array>} Lista de cursos.
     */
    async listarCursos(search = '') {
        try {
            // Condição de filtro para busca
            const searchCondition = search
                ? {
                    [Op.or]: [
                        {nome: {[Op.like]: `%${search}%`}},
                        {descricao: {[Op.like]: `%${search}%`}}
                    ]
                }
                : {};

            // Buscar cursos com o filtro (se houver)
            const cursos = await Curso.findAll({
                where: searchCondition
            });

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