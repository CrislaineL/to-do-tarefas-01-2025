const express = require('express');
const router = express.Router();

// Importando os controllers
const usuarioController = require('./controllers/index.js');
const tarefaController = require('./controllers/tarefaController.js');

// Rotas de Usuário
router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.readAll);
router.get('/usuarios/:id', usuarioController.read);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.remove);

// Rotas de Tarefa
router.post('/tarefas', tarefaController.create);           // Criar tarefa
router.get('/tarefas', tarefaController.readAll);           // Listar todas as tarefas (com nome do usuário)
router.get('/tarefas/:id', tarefaController.read);          // Obter tarefa por ID
router.put('/tarefas/:id', tarefaController.update);        // Atualizar tarefa completa
router.delete('/tarefas/:id', tarefaController.remove);     // Deletar tarefa
router.patch('/tarefas/:id/status', tarefaController.updateStatus); // Atualizar apenas o status

// Rota padrão
router.get('/', (req, res) => {
  res.send('API de Gerenciamento de Tarefas');
});

module.exports = router;
