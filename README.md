# API de Gerenciamento de Cursos

## 📋 Sobre
API RESTful desenvolvida em Node.js para gerenciamento de cursos, matrículas e usuários. O sistema permite o cadastro de cursos, controle de matrículas e gerenciamento de usuários com autenticação JWT.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js (v5.1.0)
- MySQL (via mysql2 v3.14.1)
- Sequelize ORM (v6.37.7)
- JWT para autenticação (jsonwebtoken v9.0.2)
- bcryptjs para criptografia (v3.0.2)

## 📦 Estrutura do Projeto

```
src/
├── auth/           # Configurações de autenticação
├── config/         # Configurações do projeto
├── courses/        # Módulo de cursos
├── enrollments/    # Módulo de matrículas
├── models/         # Modelos do Sequelize
├── users/          # Módulo de usuários
├── app.js         # Configuração do Express
└── server.js      # Entrada da aplicação
```

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
    - Copie o arquivo `.env.exemple` para `.env`
    - Preencha as variáveis necessárias

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 🔒 Recursos de Segurança

- Autenticação via JWT
- Criptografia de senhas com bcryptjs
- Rate limiting para proteção contra ataques de força bruta
- CORS configurado para controle de acesso

## 📚 Principais Dependências

- express: Framework web
- sequelize: ORM para banco de dados
- mysql2: Driver MySQL
- jsonwebtoken: Autenticação JWT
- bcryptjs: Criptografia de senhas
- cors: Proteção CORS
- dotenv: Gerenciamento de variáveis de ambiente
- express-rate-limit: Limitação de requisições
- moment: Manipulação de datas
- nodemon: Auto-reload em desenvolvimento

## 📝 Scripts

- `npm start`: Inicia a aplicação em modo produção
- `npm run dev`: Inicia a aplicação em modo desenvolvimento com hot-reload

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
JWT_SECRET=sua_chave_secreta_super_forte_aqui
JWT_EXPIRES_IN=1d  # Token expira em 1 dia
REQUEST_LIMIT_MINUTES=15  # Limite de requisições por minuto
REQUEST_LIMIT_MAX=100  # Limite máximo de requisições
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=plataforma_cursos
DB_PORT=3306
```

## 📌 Versão

1.0.0