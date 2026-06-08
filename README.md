# MAKAL Searching 🚀

Plataforma educacional de flashcards dinâmicos para vestibulares, com recuperação ativa e repetição espaçada.

---

## 📋 Pré-requisitos

---

## 🚀 Como rodar o projeto

### Passo 1: Instalar as dependências

Abra o terminal na pasta raiz do projeto e execute:

```bash
npm run install:all
```

> Isso instalará de forma segura as dependências do `backend/` e do `frontend/` sem causar loops recursivos no Windows.

### Passo 2: Rodar o Backend

Abra um terminal na pasta `backend/` e execute:

```bash
node index.js
```

O servidor vai iniciar em **http://localhost:3050** 🚀

> 💡 O arquivo `.env` será criado automaticamente na primeira execução a partir do `.env.example`.

### Passo 3: Rodar o Frontend

Abra **outro terminal** na pasta `frontend/` e execute:

```bash
npm run dev
```


## 🔐 Credenciais de Teste

| Usuário | Senha |
|---------|-------|
| `admin` | `123` |
| `aluno` | `123` |

---

## 📁 Estrutura do Projeto

```
MAKAL-projetof/
├── backend/              # API Express (Node.js)
│   ├── index.js          # Ponto de entrada do servidor
│   ├── .env.example      # Variáveis de ambiente (template)
│   └── src/
│       ├── config/       # Configurações (auth, database)
│       ├── controllers/  # Controladores das rotas
│       ├── models/       # Modelos de dados
│       └── routes/       # Definição das rotas
├── frontend/             # React + Vite
│   ├── index.html        # HTML principal
│   ├── vite.config.js    # Configuração do Vite (proxy para API)
│   └── src/
│       ├── App.jsx       # Componente principal com rotas
│       ├── main.jsx      # Ponto de entrada do React
│       └── pages/        # Páginas da aplicação
├── .vscode/              # Configurações do VS Code
│   ├── launch.json       # Debug com F5
│   └── tasks.json        # Tarefas automatizadas
└── package.json          # Scripts da raiz (npm start, npm install)
```

---



1. Abra a pasta `MAKAL-projetof` no VS Code
2. Pressione **F5** ou vá em **Run and Debug**
3. Selecione **"Rodar Projeto Completo (Backend + Frontend)"**
4. Acesse **http://localhost:5173** no navegador

---
