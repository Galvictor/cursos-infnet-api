const bcrypt = require('bcryptjs');
const Usuario = require('./users.model');

const criarUsuario = async (dadosUsuario) => {
    try {
        // Verifica se o e-mail já existe no banco
        const emailExistente = await Usuario.findOne({where: {email: dadosUsuario.email}});
        if (emailExistente) {
            throw new Error('E-mail já cadastrado');
        }

        // Hash da senha
        const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);

        // Criação do usuário
        const novoUsuario = await Usuario.create({
            ...dadosUsuario,
            senha: senhaHash
        });

        // Retorno do usuário sem expor a senha
        const {senha, ...usuarioSemSenha} = novoUsuario.dataValues;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {criarUsuario};