const Adocao = require('../Models/Adocao');
const Animal = require('../Models/Animal');
const Adotante = require('../Models/Adotante');

class AdocaoController {
  static async listarTodas(req, res) {
    try {
      const adocoes = await Adocao.listarTodas();
      res.json(adocoes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const adocao = await Adocao.buscarPorId(req.params.id);
      if (!adocao) {
        return res.status(404).json({ message: 'Adoção não encontrada' });
      }
      res.json(adocao);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      
      const animal = await Animal.buscarPorId(req.body.animal_id);
      if (!animal || !animal.disponivel_para_adocao) {
        return res.status(400).json({ message: 'Animal não disponível para adoção' });
      }

      
      let adotante_id = req.body.adotante_id;
      if (!adotante_id && req.body.adotante) {
        const adotanteExistente = await Adotante.buscarPorCPF(req.body.adotante.cpf);
        if (adotanteExistente) {
          adotante_id = adotanteExistente.id;
        } else {
          adotante_id = await Adotante.criar(req.body.adotante);
        }
      }

      const id = await Adocao.criar({
        animal_id: req.body.animal_id,
        adotante_id,
        observacoes: req.body.observacoes
      });

      res.status(201).json({ 
        id,
        message: 'Solicitação de adoção criada com sucesso' 
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async atualizarStatus(req, res) {
    try {
      const { status, motivo_rejeicao } = req.body;
      await Adocao.atualizarStatus(
        req.params.id, 
        status, 
        motivo_rejeicao,
        req.usuario.id
      );
      res.json({ message: `Status da adoção atualizado para ${status}` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AdocaoController;