const Evento = require('../Models/Evento');

class EventoController {
  static async listarTodos(req, res) {
    try {
      const eventos = await Evento.listarTodos();
      res.json(eventos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const evento = await Evento.buscarPorId(req.params.id);
      if (!evento) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }
      res.json(evento);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const id = await Evento.criar({
        ...req.body,
        responsavel_id: req.usuario.id
      });
      res.status(201).json({ 
        id,
        message: 'Evento criado com sucesso' 
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      await Evento.atualizar(req.params.id, req.body);
      const eventoAtualizado = await Evento.buscarPorId(req.params.id);
      res.json(eventoAtualizado);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = EventoController;