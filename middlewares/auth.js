const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.buscarPorId(decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ message: 'Token inválido - usuário não encontrado' });
    }
    
    req.usuario = {
      id: usuario.id,
      tipo: usuario.tipo,
      email: usuario.email
    };
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
