// src/scriptGerenciarT.js

// Função para buscar tarefas do backend
async function fetchTarefas() {
    try {
        const response = await fetch('http://localhost:3000/tarefas'); // URL do seu backend
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        const tarefas = await response.json();
        renderizarTarefas(tarefas);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para renderizar tarefas nas colunas
function renderizarTarefas(tarefas) {
    const afazerList = document.getElementById('afazerList');
    const fazendoList = document.getElementById('fazendoList');
    const prontoList = document.getElementById('prontoList');

    // Limpa as listas antes de renderizar
    afazerList.innerHTML = '';
    fazendoList.innerHTML = '';
    prontoList.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaDiv = document.createElement('div');
        tarefaDiv.className = 'tarefa';
        tarefaDiv.innerHTML = `
            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
            <p><strong>Setor:</strong> ${tarefa.setor}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Status:</strong> ${tarefa.status}</p>
            <button onclick="editarTarefa(${tarefa.id})">Editar</button>
            <button onclick="deletarTarefa(${tarefa.id})">Excluir</button>
        `;

        // Adiciona a tarefa na coluna correspondente
        switch (tarefa.status) {
            case 'aFazer':
                afazerList.appendChild(tarefaDiv);
                break;
            case 'fazendo':
                fazendoList.appendChild(tarefaDiv);
                break;
            case 'pronto':
                prontoList.appendChild(tarefaDiv);
                break;
            default:
                break;
        }
    });
}

// Função para editar tarefa (exemplo)
function editarTarefa(id) {
    // Redirecionar para a página de edição ou abrir um modal
    console.log(`Editar tarefa com ID: ${id}`);
}

// Função para deletar tarefa
async function deletarTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
            const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir tarefa');
            }
            fetchTarefas(); // Atualiza a lista após exclusão
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

// Chama a função para buscar tarefas ao carregar a página
window.onload = fetchTarefas;
