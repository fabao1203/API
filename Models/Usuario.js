const db = require('../config/db');

class Usuario {
  static async buscarPorEmail(email) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(
      'SELECT id, nome, email, tipo, telefone FROM usuarios WHERE id = ?', 
      [id]
    );
    return rows[0];
  }

  static async criar(usuario) {
    const { nome, email, senha, tipo, telefone } = usuario;
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, senha, tipo, telefone) VALUES (?, ?, ?, ?, ?)',
      [nome, email, senha, tipo, telefone]
    );
    return result.insertId;
  }

  static async atualizarUltimoLogin(id) {
    await db.query(
      'UPDATE usuarios SET ultimo_login = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
  }
}

module.exports = Usuario;