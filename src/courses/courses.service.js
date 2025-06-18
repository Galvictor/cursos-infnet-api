const Curso = require('./courses.model');
const Inscricao = require('../enrollments/enrollments.model');
const {Op} = require('sequelize');

/**
 * Retorna a lista de cursos disponíveis, opcionalmente filtrados por nome ou descrição.
 * Cada curso inclui uma contagem de inscrições.
 * @param {number} idUsuario ID do usuário.
 * @param {string} search Texto para filtrar os cursos.
 * @returns {Promise<Array>} Lista de cursos.
 */
async function listarCursos(idUsuario, search = '') {
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

                // Verificar se o usuário está inscrito neste curso
                const inscrito = await Inscricao.findOne({
                    where: {
                        id_curso: curso.id,
                        id_usuario: idUsuario, // Verificação pelo ID do usuário
                    },
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
                    inscricao_cancelada: inscrito ? !!inscrito.cancelado_em : false,
                    inscrito: inscrito ? !!inscrito.inscrito_em : false
                };
            })
        );
    } catch (error) {
        console.error('Erro ao buscar cursos', error);
        throw new Error('Erro ao buscar cursos');
    }
}

async function listarCursosDoUsuario(idUsuario) {
    try {
        // Buscar todas as inscrições do usuário junto com os dados dos cursos
        const inscricoes = await Inscricao.findAll({
            where: {
                id_usuario: idUsuario
            },
            include: [{
                model: Curso,
                as: 'curso',
                attributes: ['id', 'nome', 'descricao', 'capa', 'data_inicio_curso']
            }],
            // Importante: não usar raw: true aqui para manter os métodos do modelo
            attributes: ['id', 'inscrito_em', 'cancelado_em', 'id_curso']
        });

        // Formatar os dados para retornar conforme especificado
        const cursosFormatados = await Promise.all(inscricoes.map(async inscricao => {
            const curso = inscricao.curso;

            // Debug para verificar os valores
            console.log('Dados da inscrição:', {
                inscrito_em: inscricao.inscrito_em,
                cancelado_em: inscricao.cancelado_em
            });


            // Contar o número total de inscrições para este curso
            const countInscricoes = await Inscricao.count({
                where: {id_curso: curso.id}
            });

            return {
                id: curso.id,
                nome: curso.nome,
                descricao: curso.descricao,
                capa: curso.capa,
                inicio: curso.data_inicio_curso ? new Date(curso.data_inicio_curso).toLocaleDateString('pt-BR') : null,
                inscricoes: countInscricoes,
                inscricao_cancelada: inscricao.cancelado_em !== null,
                inscrito: inscricao.inscrito_em !== null
            };
        }));

        return cursosFormatados;
    } catch (error) {
        console.error('Erro ao listar cursos do usuário:', error);
        throw new Error('Erro ao listar cursos do usuário');
    }
}


module.exports = {listarCursos, listarCursosDoUsuario};