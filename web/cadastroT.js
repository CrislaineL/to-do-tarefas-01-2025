// src/cadastroT.js

// Função para buscar usuários e preencher o select
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:7000/usuarios');
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        const usuarios = await response.json();
        const usuarioSelect = document.getElementById('usuario');

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = usuario.nome;
            usuarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// ✅ Função corrigida para cadastrar uma nova tarefa
async function cadastrarTarefa() {
    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const usuarioId = document.getElementById('usuario').value;
    const prioridade = document.getElementById('prioridade').value;

    if (!descricao || !setor || !usuarioId || !prioridade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:7000/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao,
                setor,
                usuarioId: parseInt(usuarioId),
                prioridade
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error('Erro ao cadastrar tarefa: ' + errorMsg);
        }

        const tarefa = await response.json();
        console.log('Tarefa cadastrada:', tarefa);

        // Redireciona para gerenciamento
        window.location.href = 'gerenciarT.html';

    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('results').innerText = error.message;
    }
}

// Adiciona o evento de clique ao botão de cadastrar
document.getElementById('botao').addEventListener('click', cadastrarTarefa);

// Busca os usuários ao carregar a página
window.onload = fetchUsuarios;
