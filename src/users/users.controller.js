const {criarUsuario} = require('./users.service');

const cadastrarUsuario = async (req, res) => {
    try {
        const dadosUsuario = req.body;

        // Validação básica (exemplo, pode ser aprimorada)
        if (!dadosUsuario.nome || !dadosUsuario.email || !dadosUsuario.senha || !dadosUsuario.data_nascimento) {
            return res.status(400).json({success: false, message: 'Todos os campos são obrigatórios.'});
        }

        // Chama o serviço para criar o usuário
        const novoUsuario = await criarUsuario(dadosUsuario);

        // Retorna o usuário criado (sem a senha)
        return res.status(201).json({success: true, data: novoUsuario});

    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
};

module.exports = {cadastrarUsuario};