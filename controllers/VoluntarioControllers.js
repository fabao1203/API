const Voluntario = require('../Models/Voluntario');

class VoluntarioController {
  static async listarTodos(req, res) {
    try {
      const voluntarios = await Voluntario.listarTodos();
      res.json(voluntarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const voluntario = await Voluntario.buscarPorId(req.params.id);
      if (!voluntario) {
        return res.status(404).json({ message: 'Voluntário não encontrado' });
      }
      res.json(voluntario);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const id = await Voluntario.criar(req.body);
      res.status(201).json({ 
        id,
        message: 'Voluntário cadastrado com sucesso' 
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      await Voluntario.atualizar(req.params.id, req.body);
      const voluntarioAtualizado = await Voluntario.buscarPorId(req.params.id);
      res.json(voluntarioAtualizado);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = VoluntarioController;