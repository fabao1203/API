const express = require('express');
const router = express.Router();
const EventoController = require('../Controllers/EventoController');
const authMiddleware = require('../middlewares/auth');

router.get('/', EventoController.listarTodos);
router.get('/:id', EventoController.buscarPorId);
router.post('/', authMiddleware, EventoController.criar);
router.put('/:id', authMiddleware, EventoController.atualizar);

module.exports = router;