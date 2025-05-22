const Animal = require('../Models/Animal');

class AnimalController {
  static async listarDisponiveis(req, res) {
    try {
      const animais = await Animal.listarDisponiveis();
      res.json(animais);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const animal = await Animal.buscarPorId(req.params.id);
      if (!animal) {
        return res.status(404).json({ message: 'Animal não encontrado' });
      }
      res.json(animal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const novoAnimal = await Animal.criar(req.body);
      res.status(201).json(novoAnimal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      await Animal.atualizar(req.params.id, req.body);
      const animalAtualizado = await Animal.buscarPorId(req.params.id);
      res.json(animalAtualizado);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async remover(req, res) {
    try {
      await Animal.remover(req.params.id);
      res.json({ message: 'Animal marcado como não disponível' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async filtrarPorTipo(req, res) {
    try {
      const animais = await Animal.filtrarPorTipo(req.params.tipo);
      res.json(animais);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AnimalController;