const Doacao = require('../Models/Doacao');

class DoacaoController {
  static async listarTodas(req, res) {
    try {
      const doacoes = await Doacao.listarTodas();
      res.json(doacoes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const doacao = await Doacao.buscarPorId(req.params.id);
      if (!doacao) {
        return res.status(404).json({ message: 'Doação não encontrada' });
      }
      res.json(doacao);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const id = await Doacao.criar(req.body);
      res.status(201).json({ 
        id,
        message: 'Doação registrada com sucesso' 
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async confirmar(req, res) {
    try {
      const { comprovante_url } = req.body;
      await Doacao.confirmarDoacao(
        req.params.id,
        req.usuario.id,
        comprovante_url
      );
      res.json({ message: 'Doação confirmada com sucesso' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = DoacaoController;