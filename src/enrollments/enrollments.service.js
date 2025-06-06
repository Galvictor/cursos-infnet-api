const Inscricao = require('./enrollments.model');
const Curso = require('../courses/courses.model');

const criarInscricao = async (idUsuario, idCurso) => {
    try {
        // Verifica se o curso existe
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return {error: true, status: 404, message: "Curso não encontrado"};
        }

        // Cria a inscrição
        const novaInscricao = await Inscricao.create({id_usuario: idUsuario, id_curso: idCurso});
        return {error: false, status: 200, inscricao: novaInscricao};
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return {error: true, status: 400, message: 'Usuário já inscrito neste curso'};
        }
        // Retorna erro genérico
        return {error: true, status: 400, message: 'Erro ao criar inscrição: ' + err.message};
    }
};

const cancelarInscricao = async (idUsuario, idCurso) => {
    try {
        // Busca a inscrição com base no usuário e curso
        const inscricao = await Inscricao.findOne({
            where: {
                id_usuario: idUsuario,
                id_curso: idCurso,
                cancelado_em: null // Certifica-se de que a inscrição não foi cancelada antes
            }
        });

        // Verifica se a inscrição existe
        if (!inscricao) {
            return {error: true, status: 404, message: "Inscrição não encontrada"};
        }

        // Atualiza o campo `cancelado_em` com a data atual
        inscricao.cancelado_em = new Date();
        await inscricao.save();

        return {error: false, status: 200, message: "Inscrição cancelada com sucesso"};
    } catch (err) {
        // Retorna erro genérico
        return {error: true, status: 400, message: "Erro ao cancelar inscrição: " + err.message};
    }
};

module.exports = {criarInscricao, cancelarInscricao};