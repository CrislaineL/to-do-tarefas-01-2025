// src/gerenciarT.js

// Função para buscar tarefas do backend
async function fetchTarefas() {
    try {
        const response = await fetch('http://localhost:7000/tarefas'); // Corrigido para a porta correta
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        const tarefas = await response.json();
        renderizarTarefas(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

// Função para renderizar tarefas nas colunas
function renderizarTarefas(tarefas) {
    const afazerList = document.getElementById('afazerList');
    const fazendoList = document.getElementById('fazendoList');
    const prontoList = document.getElementById('prontoList');

    afazerList.innerHTML = '';
    fazendoList.innerHTML = '';
    prontoList.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaDiv = document.createElement('div');
        tarefaDiv.className = 'tarefa';
        tarefaDiv.innerHTML = `
           <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
<p><strong>Setor:</strong> ${tarefa.setor}</p>
<p><strong>Usuário:</strong> ${tarefa.usuario?.nome || 'Desconhecido'}</p>
<p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
<p><strong>Status:</strong> ${tarefa.status}</p>

        `;

        // Normaliza o status para minúsculas
        const status = tarefa.status.toLowerCase();

        switch (status) {
            case 'afazer':
                afazerList.appendChild(tarefaDiv);
                break;
            case 'fazendo':
                fazendoList.appendChild(tarefaDiv);
                break;
            case 'pronto':
                prontoList.appendChild(tarefaDiv);
                break;
            default:
                console.warn('Status inválido:', status);
                break;
        }
    });
}

// Editar tarefa (placeholder)
function editarTarefa(id) {
    console.log(`Editar tarefa com ID: ${id}`);
}

// Função para deletar tarefa
async function deletarTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
            const response = await fetch(`http://localhost:7000/tarefas/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir tarefa');
            }
            fetchTarefas(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    }
}

// Inicializa ao carregar a página
window.onload = fetchTarefas;
