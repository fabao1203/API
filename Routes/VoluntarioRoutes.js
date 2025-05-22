const express = require('express');
const router = express.Router();
const VoluntarioController = require('../Controllers/VoluntarioController');
const authMiddleware = require('../middlewares/auth');

router.get('/', VoluntarioController.listarTodos);
router.get('/:id', VoluntarioController.buscarPorId);
router.post('/', VoluntarioController.criar);
router.put('/:id', authMiddleware, VoluntarioController.atualizar);

module.exports = router;