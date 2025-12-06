// URL da API Backend
const API_URL = 'http://localhost:3000/produtos';

// Variáveis para controlar edição
let modoEdicao = false;
let produtoIdAtual = null;

// CRUD - Read
// Função para carregar e exibir todos os produtos
async function carregarCatalogo() {
    const divLista = document.getElementById('lista-produtos');
    try {
        divLista.innerHTML = '<p class="loading">Carregando catálogo...</p>';
        
        // Faz requisição GET para buscar produtos
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar produtos');

        const produtos = await response.json();
        
        // Se não houver produtos, mostra mensagem
        if (!produtos || !produtos.length) {
            divLista.innerHTML = '<p class="loading">Nenhum produto cadastrado.</p>';
            return;
        }

        // Cria os cards HTML para cada produto
        divLista.innerHTML = produtos.map(produto => `
            <div class="produto-card">
                <img src="${produto.imagem}" class="produto-img" alt="${produto.nome}">
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span class="price">R$ ${produto.preco.toFixed(2)}</span>
                </div>
                <div class="produto-acoes">
                    <button class="btn-editar" onclick="editarProduto('${produto._id}')">Editar</button>
                    <button class="btn-excluir" onclick="excluirProduto('${produto._id}')">Excluir</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro:', erro);
        divLista.innerHTML = '<p class="loading">Erro ao conectar com o servidor.</p>';
    }
}

// CRUD - Create
// Abre o formulário para cadastrar novo produto
function abrirPainel() {
    const formulario = document.getElementById('formulario');
    formulario.classList.remove('oculto');
    modoEdicao = false;
    produtoIdAtual = null;
    document.getElementById('form-produto').reset();
    document.getElementById('btn-submit').textContent = 'Cadastrar';
    document.querySelector('#formulario h2').textContent = 'Cadastrar Produto';
}

// CRUD - Create e Update
// Salva produto (cria novo ou atualiza existente)
async function salvarProduto(evento) {
    evento.preventDefault();
    
    // Coleta os dados do formulário
    const dados = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        descricao: document.getElementById('descricao').value,
        estoque: parseInt(document.getElementById('estoque').value),
        imagem: document.getElementById('imagem').value
    };

    try {
        // Define URL e método HTTP baseado no modo (criar ou editar)
        const url = modoEdicao ? `${API_URL}/${produtoIdAtual}` : API_URL;
        const method = modoEdicao ? 'PUT' : 'POST';

        // Envia requisição para o servidor
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!response.ok) throw new Error('Erro ao salvar');

        // Limpa formulário e recarrega catálogo
        document.getElementById('form-produto').reset();
        document.getElementById('formulario').classList.add('oculto');
        modoEdicao = false;
        produtoIdAtual = null;
        alert(`Produto ${modoEdicao ? 'atualizado' : 'cadastrado'}!`);
        carregarCatalogo();
    } catch (erro) {
        alert('Erro ao salvar produto');
    }
}

// CRUD - Update
// Carrega produto no formulário para edição
async function editarProduto(id) {
    try {
        // Busca o produto pelo ID
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Produto não encontrado');
        const produto = await response.json();
        
        // Preenche o formulário com os dados do produto
        produtoIdAtual = produto._id;
        modoEdicao = true;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('estoque').value = produto.estoque;
        document.getElementById('imagem').value = produto.imagem;
        document.getElementById('btn-submit').textContent = 'Atualizar';
        document.querySelector('#formulario h2').textContent = 'Editar Produto';
        document.getElementById('formulario').classList.remove('oculto');
    } catch (erro) {
        alert('Erro ao carregar produto');
    }
}

// CRUD - Delete
// Remove um produto
async function excluirProduto(id) {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    try {
        // Envia requisição DELETE
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir');

        alert('Produto excluído!');
        carregarCatalogo(); // Recarrega a lista
    } catch (erro) {
        alert('Erro ao excluir produto');
    }
}

// Fecha o formulário
function resetFormulario() {
    document.getElementById('form-produto').reset();
    document.getElementById('formulario').classList.add('oculto');
    modoEdicao = false;
    produtoIdAtual = null;
}

// Quando a página carregar, configura os eventos
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-produto').addEventListener('submit', salvarProduto);
    document.getElementById('btn-painel').addEventListener('click', abrirPainel);
    document.getElementById('btn-fechar').addEventListener('click', resetFormulario);
    carregarCatalogo(); // Carrega produtos ao iniciar
});
