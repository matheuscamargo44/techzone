# TechZone - E-commerce de Periféricos

Sistema FullStack simples para gerenciamento de produtos (MVP).

## Stack Tecnológica

- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB Atlas
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)

## Como Executar

### Backend

```bash
cd backend
npm install
npm start
```

Ou para desenvolvimento com auto-reload:

```bash
npm run dev
```

### Frontend

Abra o arquivo `frontend/index.html` no navegador.

## Funcionalidades

- Listar produtos (GET)
- Buscar produto por id (GET /:id)
- Cadastrar produtos (POST)
- Atualizar produtos (PUT)
- Excluir produtos (DELETE)
- Painel admin no frontend (botão abre/fecha formulário)

## Estrutura

```
techzone/
├── backend/          # API REST
│   └── server.js     # Servidor Express
├── frontend/         # Interface
│   ├── index.html
│   ├── script.js
│   └── style.css
```

## Configuração

- Crie um arquivo `.env` em `backend/` com:
  ```
  MONGO_URI=sua_string_do_mongodb
  PORT=3000
  ```

## Uso rápido

1. Suba o backend (`npm start` em `backend/`)
2. Abra `frontend/index.html`
3. Clique em “Painel Admin” para cadastrar/editar
4. Use “Editar” e “Excluir” nos cards para completar o CRUD

