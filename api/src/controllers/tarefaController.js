// api/src/controllers/tarefaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    try {
      const { descricao, setor, prioridade, status, usuarioId } = req.body;
      const tarefa = await prisma.tarefa.create({
        data: { descricao, setor, prioridade, status, usuarioId }
      });
      res.status(201).json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tarefa', detalhe: error.message });
    }
  },

  async readAll(req, res) {
    try {
      const tarefas = await prisma.tarefa.findMany();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  async read(req, res) {
    try {
      const id = Number(req.params.id);
      const tarefa = await prisma.tarefa.findUnique({ where: { id } });
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  },

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { descricao, setor, prioridade, status, usuarioId } = req.body;
      const tarefa = await prisma.tarefa.update({
        where: { id },
        data: { descricao, setor, prioridade, status, usuarioId }
      });
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  async remove(req, res) {
    try {
      const id = Number(req.params.id);
      await prisma.tarefa.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  },

  async updateStatus(req, res) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      const tarefa = await prisma.tarefa.update({
        where: { id },
        data: { status }
      });
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar status da tarefa' });
    }
  }
};
