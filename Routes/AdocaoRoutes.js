const express = require('express');
const router = express.Router();
const AdocaoController = require('../Controllers/AdocaoController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, AdocaoController.listarTodas);
router.get('/:id', authMiddleware, AdocaoController.buscarPorId);
router.post('/', AdocaoController.criar);
router.put('/:id/status', authMiddleware, AdocaoController.atualizarStatus);

module.exports = router;