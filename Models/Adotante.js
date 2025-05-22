const db = require('../config/db');

class Adotante {
  static async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM adotantes WHERE id = ?', [id]);
    return rows[0];
  }

  static async criar(adotante) {
    const { nome, email, telefone, cpf, data_nascimento, endereco, cidade, estado, cep, profissao } = adotante;
    const [result] = await db.query(
      `INSERT INTO adotantes 
      (nome, email, telefone, cpf, data_nascimento, endereco, cidade, estado, cep, profissao) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, cpf, data_nascimento, endereco, cidade, estado, cep, profissao]
    );
    return result.insertId;
  }

  static async buscarPorCPF(cpf) {
    const [rows] = await db.query('SELECT * FROM adotantes WHERE cpf = ?', [cpf]);
    return rows[0];
  }
}

module.exports = Adotante;