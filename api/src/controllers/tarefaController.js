// src/controllers/tarefaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar nova tarefa
const create = async (req, res) => {
  try {
    const { descricao, setor, usuarioId, prioridade } = req.body;

    const novaTarefa = await prisma.tarefa.create({
      data: {
        descricao,
        setor,
        prioridade,
        status: 'aFazer', // status padrão
        usuario: {
          connect: { id: usuarioId }
        }
      }
    });

    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('❌ Erro ao criar tarefa:', error);
    res.status(500).json({ erro: 'Não foi possível criar a tarefa', detalhe: error.message });
  }
};

// Buscar todas as tarefas com o nome do usuário
const readAll = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: { select: { id: true, nome: true } } }
    });
    res.status(200).json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
};

// Buscar tarefa específica por ID
const read = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id },
      include: { usuario: { select: { id: true, nome: true } } }
    });
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.status(200).json(tarefa);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
};

// Atualizar tarefa completa
const update = async (req, res) => {
  const id = Number(req.params.id);
  const { descricao, setor, prioridade, status, usuarioId } = req.body;

  try {
    const tarefaExistente = await prisma.tarefa.findUnique({ where: { id } });
    if (!tarefaExistente) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        descricao,
        setor,
        prioridade,
        status,
        usuarioId: usuarioId ? Number(usuarioId) : tarefaExistente.usuarioId
      }
    });
    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};

// Atualizar apenas o status (rota PATCH)
const updateStatus = async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!status) return res.status(400).json({ erro: 'Status é obrigatório' });

  try {
    const tarefaExistente = await prisma.tarefa.findUnique({ where: { id } });
    if (!tarefaExistente) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: { status }
    });
    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ erro: 'Erro ao atualizar status da tarefa' });
  }
};

// Deletar tarefa por ID
const remove = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.tarefa.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
  }
};

module.exports = {
  create,
  readAll,
  read,
  update,
  updateStatus,
  remove
};
