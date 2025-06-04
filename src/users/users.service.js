const bcrypt = require('bcryptjs');
const Usuario = require('./users.model');
const moment = require('moment');
const {generateToken} = require('../auth/jwt'); // Importa a função para gerar o token

const criarUsuario = async (dadosUsuario) => {
    try {
        // Verifica se o e-mail já existe no banco
        const emailExistente = await Usuario.findOne({where: {email: dadosUsuario.email}});
        if (emailExistente) {
            throw new Error('E-mail já cadastrado');
        }

        // Verifica e formata a data de nascimento
        const dataFormatada = moment(dadosUsuario.data_nascimento, 'DD/MM/YYYY', true);
        if (!dataFormatada.isValid()) {
            throw new Error('Data de nascimento inválida. Use o formato DD/MM/YYYY.');
        }

        // Converte para o formato ISO (YYYY-MM-DD)
        dadosUsuario.data_nascimento = dataFormatada.format('YYYY-MM-DD');

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

const autenticarUsuario = async (email, senha) => {
    try {
        // Busca o usuário pelo e-mail
        const usuario = await Usuario.findOne({where: {email}});
        if (!usuario) {
            throw new Error('Usuário ou senha incorretos');
        }

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha incorretos');
        }

        // Gera o token JWT
        const token = generateToken({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });

        // Retorna o token e alguns dados do usuário
        const {senha: _, ...usuarioSemSenha} = usuario.dataValues;
        return {usuario: usuarioSemSenha, token};

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {criarUsuario, autenticarUsuario};