// src/cadastroT.js

// Função para buscar usuários e preencher o select
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:7000/usuarios'); // URL do seu backend
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        const usuarios = await response.json();
        const usuarioSelect = document.getElementById('usuario');

        // Preenche o select com os usuários
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = usuario.nome; // Exibe o nome do usuário
            usuarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para cadastrar uma nova tarefa
async function cadastrarTarefa() {
    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const usuarioId = document.getElementById('usuario').value;
    const prioridade = document.getElementById('prioridade').value;

    // Validação básica
    if (!descricao || !setor || !usuarioId || !prioridade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tarefas', {
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
            throw new Error('Erro ao cadastrar tarefa');
        }

        const tarefa = await response.json();
        document.getElementById('results').innerText = 'Tarefa cadastrada com sucesso!';
        console.log('Tarefa cadastrada:', tarefa);
        
        // Limpa o formulário após o cadastro
        document.getElementById('taskForm').reset();
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('results').innerText = 'Erro ao cadastrar tarefa.';
    }
}

// Adiciona o evento de clique ao botão de cadastrar
document.getElementById('botao').addEventListener('click', cadastrarTarefa);

// Chama a função para buscar usuários ao carregar a página
window.onload = fetchUsuarios;
