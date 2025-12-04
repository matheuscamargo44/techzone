const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conecta ao banco
const mongoURI = 'mongodb+srv://camargo:78ydh566@techzone-cluster.gxc4cwm.mongodb.net/?appName=techzone-cluster';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Conectado com Sucesso!'))
    .catch(err => console.log('Erro ao conectar no Mongo:', err));

// Models
const ProdutoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String,
    estoque: Number,
    imagem: String 
});
const Produto = mongoose.model('Produto', ProdutoSchema);

app.get('/', (req, res) => {
    res.send('API da TechZone rodando!');
});

// Rota para buscar produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
});

// Rota para criar produto
app.post('/produtos', async (req, res) => {
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar produto' });
    }
});

// Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});