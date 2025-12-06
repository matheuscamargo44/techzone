// Importa as bibliotecas necessárias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

// Cria a aplicação Express
const app = express();
app.use(express.json()); // Permite receber JSON nas requisições
app.use(cors()); // Permite requisições de outros domínios

// Conecta ao MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/techzone';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Conectado!'))
    .catch(err => console.error('Erro ao conectar:', err.message));

// Define o modelo do Produto
const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String, required: true },
    estoque: { type: Number, required: true },
    imagem: { type: String, required: true }
}, { timestamps: true });

const Produto = mongoose.model('Produto', ProdutoSchema);

// Rotas do CRUD

// GET / - Rota de teste
app.get('/', (req, res) => {
    res.send('API TechZone rodando!');
});

// GET /produtos - READ: Busca todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
});

// GET /produtos/:id - READ: Busca um produto específico
app.get('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
});

// POST /produtos - CREATE: Cria um novo produto
app.post('/produtos', async (req, res) => {
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar produto' });
    }
});

// PUT /produtos/:id - UPDATE: Atualiza um produto existente
app.put('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao atualizar produto' });
    }
});

// DELETE /produtos/:id - DELETE: Remove um produto
app.delete('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao excluir produto' });
    }
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
