const {criarUsuario, autenticarUsuario} = require('./users.service');

const cadastrarUsuario = async (req, res) => {
    try {
        const dadosUsuario = req.body;

        // Validação básica
        if (!dadosUsuario.nome || !dadosUsuario.email || !dadosUsuario.senha || !dadosUsuario.data_nascimento) {
            return res.status(400).json({success: false, message: 'Todos os campos são obrigatórios.'});
        }

        // Chama o serviço para criar o usuário
        const novoUsuario = await criarUsuario(dadosUsuario);

        // Retorna o usuário criado
        return res.status(201).json({success: true, data: novoUsuario});
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
};

const loginUsuario = async (req, res) => {
    try {
        const {email, senha} = req.body;

        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({success: false, message: 'E-mail e senha são obrigatórios.'});
        }

        // Chama o serviço de autenticação
        const resultado = await autenticarUsuario(email, senha);

        // Retorna o token e os dados do usuário
        return res.status(200).json({success: true, data: resultado});
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
};

module.exports = {cadastrarUsuario, loginUsuario};