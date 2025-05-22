const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.buscarPorEmail(email);
      
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      await Usuario.atualizarUltimoLogin(usuario.id);
      
      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo }, 
        process.env.JWT_SECRET, 
        { expiresIn: '8h' }
      );
      
      res.json({ 
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async registrar(req, res) {
    try {
      const { nome, email, senha, telefone } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      
      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
      
      const id = await Usuario.criar({
        nome,
        email,
        senha: senhaHash,
        tipo: 'funcionario',
        telefone
      });
      
      const token = jwt.sign(
        { id, tipo: 'funcionario' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '8h' }
      );
      
      res.status(201).json({ 
        token,
        usuario: {
          id,
          nome,
          email,
          tipo: 'funcionario'
        }
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AuthController;
