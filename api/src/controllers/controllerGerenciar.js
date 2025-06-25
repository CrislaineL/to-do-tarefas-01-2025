// controllerGerenciar.js

const express = require('express');
const router = express.Router();

let tarefas = [
  // Exemplo de tarefa inicial
  {
    id: 1,
    descricao: 'Exemplo de tarefa',
    setor: 'TI',
    prioridade: 'alta',
    status: 'afazer',
    usuarioId: 1
  }
];

let proximoId = 2;

// GET - Listar todas as tarefas
router.get('/tarefas', (req, res) => {
  const expandUsuario = req.query._expand === 'usuario';

  if (expandUsuario) {
    const usuarios = require('./usuarios.json'); // Simulando banco de usuários
    const tarefasComUsuario = tarefas.map(tarefa => ({
      ...tarefa,
      usuario: usuarios.find(u => u.id === tarefa.usuarioId)
    }));
    res.json(tarefasComUsuario);
  } else {
    res.json(tarefas);
  }
});

// POST - Criar nova tarefa
router.post('/tarefas', (req, res) => {
  const { descricao, setor, prioridade, usuarioId } = req.body;

  if (!descricao || !setor || !prioridade || !usuarioId) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

  const novaTarefa = {
    id: proximoId++,
    descricao,
    setor,
    prioridade,
    status: 'afazer', // padrão
    usuarioId
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// DELETE - Excluir tarefa
router.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  tarefas.splice(index, 1);
  res.status(204).end();
});

// PUT - Editar tarefa
router.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  const { descricao, setor, prioridade, status, usuarioId } = req.body;
  tarefas[index] = {
    ...tarefas[index],
    descricao,
    setor,
    prioridade,
    status,
    usuarioId
  };

  res.json(tarefas[index]);
});

module.exports = router;
