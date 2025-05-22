const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/AnimalController');
const authMiddleware = require('../middlewares/auth');


router.get('/', AnimalController.listarDisponiveis);
router.get('/:id', AnimalController.buscarPorId);
router.get('/tipo/:tipo', AnimalController.filtrarPorTipo);


router.post('/', authMiddleware, AnimalController.criar);
router.put('/:id', authMiddleware, AnimalController.atualizar);
router.delete('/:id', authMiddleware, AnimalController.remover);

module.exports = router;