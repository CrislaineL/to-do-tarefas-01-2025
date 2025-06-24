const express = require('express');
const router = express.Router();

// Importando os controllers
const usuarioController = require('./controllers/index.js');
const tarefaController = require('./controllers/tarefaController.js'); // ✅ corrigido aqui

// Rotas de Usuário
router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.readAll);
router.get('/usuarios/:id', usuarioController.read);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.remove);

// Rotas de Tarefa
router.post('/tarefas', tarefaController.create);
router.get('/tarefas', tarefaController.readAll);
router.get('/tarefas/:id', tarefaController.read);
router.put('/tarefas/:id', tarefaController.update);
router.delete('/tarefas/:id', tarefaController.remove);
router.patch('/tarefas/:id/status', tarefaController.updateStatus);

// Rota padrão
router.get('/', (req, res) => {
  res.send('API de Gerenciamento de Tarefas');
});

module.exports = router;
