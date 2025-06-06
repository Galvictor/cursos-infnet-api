const Inscricao = require('./enrollments.model');
const Curso = require('../courses/courses.model');

const criarInscricao = async (idUsuario, idCurso) => {
    try {
        // Verifica se o curso existe
        const curso = await Curso.findByPk(idCurso);
        if (!curso) {
            return {error: true, status: 404, message: "Curso não encontrado"};
        }

        // Verifica se o usuário já está inscrito neste curso (mesmo que cancelado)
        const inscricaoExistente = await Inscricao.findOne({
            where: {
                id_usuario: idUsuario,
                id_curso: idCurso
            }
        });

        // Caso exista uma inscrição mas ela esteja cancelada, reativa-a
        if (inscricaoExistente && inscricaoExistente.cancelado_em) {
            inscricaoExistente.cancelado_em = null; // Remove o cancelamento
            inscricaoExistente.inscrito_em = new Date(); // Atualiza a data de inscrição
            await inscricaoExistente.save();
            return {error: false, status: 200, inscricao: inscricaoExistente};
        }

        // Caso o usuário já esteja inscrito e a inscrição não esteja cancelada
        if (inscricaoExistente) {
            return {error: true, status: 400, message: 'Usuário já inscrito neste curso'};
        }

        // Cria uma nova inscrição
        const novaInscricao = await Inscricao.create({
            id_usuario: idUsuario,
            id_curso: idCurso,
            inscrito_em: new Date()
        });

        return {error: false, status: 200, inscricao: novaInscricao};

    } catch (err) {
        console.error('Erro ao criar inscrição:', err);
        return {error: true, status: 400, message: 'Erro ao criar inscrição: ' + err.message};
    }
};


const cancelarInscricao = async (idUsuario, idCurso) => {
    try {
        // Busca a inscrição com base no usuário e curso
        const inscricao = await Inscricao.findOne({
            where: {
                id_usuario: idUsuario,
                id_curso: idCurso
            }
        });

        // Verifica se a inscrição existe
        if (!inscricao) {
            return {error: true, status: 404, message: "Inscrição não encontrada"};
        }

        // Atualiza o campo `cancelado_em` com a data atual
        inscricao.cancelado_em = new Date();
        inscricao.inscrito_em = null;
        await inscricao.save();

        return {error: false, status: 200, message: "Inscrição cancelada com sucesso"};
    } catch (err) {
        // Retorna erro genérico
        return {error: true, status: 400, message: "Erro ao cancelar inscrição: " + err.message};
    }
};

module.exports = {criarInscricao, cancelarInscricao};