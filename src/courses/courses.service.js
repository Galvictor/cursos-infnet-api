const Curso = require('./courses.model');
const Inscricao = require('../enrollments/enrollments.model');
const {Op} = require('sequelize');

/**
 * Retorna a lista de cursos disponíveis, opcionalmente filtrados por nome ou descrição.
 * Cada curso inclui uma contagem de inscrições.
 * @param {string} search Texto para filtrar os cursos.
 * @returns {Promise<Array>} Lista de cursos.
 */
async function listarCursos(search = '') {
    try {
        // Condição de filtro para busca
        const searchCondition = search
            ? {
                [Op.or]: [
                    {nome: {[Op.like]: `%${search}%`}},
                    {descricao: {[Op.like]: `%${search}%`}},
                ],
            }
            : {};

        // Buscar cursos com o filtro (se houver)
        const cursos = await Curso.findAll({
            where: searchCondition,
            attributes: ['id', 'nome', 'descricao', 'capa', 'data_inicio_curso'],
        });

        // Para cada curso, contar o número de inscrições
        return await Promise.all(
            cursos.map(async (curso) => {
                const countInscricoes = await Inscricao.count({
                    where: {id_curso: curso.id},
                });

                const dataFormatada = curso.data_inicio_curso
                    ? new Date(curso.data_inicio_curso).toLocaleDateString('pt-BR')
                    : null;

                return {
                    id: curso.id,
                    nome: curso.nome,
                    descricao: curso.descricao,
                    capa: curso.capa,
                    inicio: dataFormatada,
                    inscricoes: countInscricoes,
                    inscrito: false,
                };
            })
        );
    } catch (error) {
        console.error('Erro ao buscar cursos', error);
        throw new Error('Erro ao buscar cursos');
    }
}

module.exports = {listarCursos};