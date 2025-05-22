const express = require('express');
const router = express.Router();
const DoacaoController = require('../Controllers/DoacaoController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, DoacaoController.listarTodas);
router.get('/:id', authMiddleware, DoacaoController.buscarPorId);
router.post('/', DoacaoController.criar);
router.put('/:id/confirmar', authMiddleware, DoacaoController.confirmar);

module.exports = router;