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

/**
 * Retorna todos os cursos em que o usuário está inscrito.
 * @param {number} idUsuario ID do usuário.
 * @returns {Promise<Array>} Lista de cursos.
 */
async function listarCursosDoUsuario(idUsuario) {
    try {
        // Busca todas as inscrições do usuário
        const inscricoes = await Inscricao.findAll({
            where: {id_usuario: idUsuario},
            include: {
                model: Curso,
                as: 'curso', // Alias definido na associação
                attributes: ['id', 'nome', 'descricao', 'capa', 'data_inicio_curso'] // Dados necessários do curso
            }
        });

        // Mapeia as inscrições para retornar no formato solicitado
        return await Promise.all(
            inscricoes.map(async (inscricao) => {
                // Conta o total de inscrições no curso
                const countInscricoes = await Inscricao.count({
                    where: {id_curso: inscricao.curso.id}
                });

                // Formata a data de início do curso
                const dataFormatada = inscricao.curso.data_inicio_curso
                    ? new Date(inscricao.curso.data_inicio_curso).toLocaleDateString('pt-BR')
                    : null;

                return {
                    id: inscricao.curso.id,
                    nome: inscricao.curso.nome,
                    descricao: inscricao.curso.descricao,
                    capa: inscricao.curso.capa,
                    inscricoes: countInscricoes, // Total de inscrições no curso
                    inicio: dataFormatada, // Data formatada
                    inscricao_cancelada: !!inscricao.cancelado_em, // Verifica se a inscrição foi cancelada
                    inscrito: !!inscricao.inscrito_em // Confirmamos que o usuário está inscrito neste curso
                };
            })
        );
    } catch (error) {
        console.error('Erro ao listar cursos do usuário:', error);
        throw new Error('Erro ao listar cursos do usuário');
    }
}


module.exports = {listarCursos, listarCursosDoUsuario};