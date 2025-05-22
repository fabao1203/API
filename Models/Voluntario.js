const db = require('../config/db');

class Voluntario {
  static async listarTodos() {
    const [rows] = await db.query('SELECT * FROM voluntarios WHERE ativo = TRUE');
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM voluntarios WHERE id = ?', [id]);
    return rows[0];
  }

  static async criar(voluntario) {
    const { nome, email, telefone, data_nascimento, endereco, profissao, disponibilidade, experiencia, habilidades, usuario_id } = voluntario;
    const [result] = await db.query(
      `INSERT INTO voluntarios 
      (nome, email, telefone, data_nascimento, endereco, profissao, disponibilidade, experiencia, habilidades, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, data_nascimento, endereco, profissao, disponibilidade, experiencia, habilidades, usuario_id]
    );
    return result.insertId;
  }

  static async atualizar(id, voluntario) {
    const { nome, email, telefone, data_nascimento, endereco, profissao, disponibilidade, experiencia, habilidades, ativo } = voluntario;
    await db.query(
      `UPDATE voluntarios SET 
      nome = ?, email = ?, telefone = ?, data_nascimento = ?, 
      endereco = ?, profissao = ?, disponibilidade = ?, 
      experiencia = ?, habilidades = ?, ativo = ?
      WHERE id = ?`,
      [nome, email, telefone, data_nascimento, endereco, profissao, disponibilidade, experiencia, habilidades, ativo, id]
    );
  }
}

module.exports = Voluntario;