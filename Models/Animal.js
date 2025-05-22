const db = require('../config/db');

class Animal {
  static async listarDisponiveis() {
    const [rows] = await db.query(`
      SELECT * FROM animais 
      WHERE disponivel_para_adocao = TRUE 
      AND status = 'Disponível'
    `);
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM animais WHERE id = ?', [id]);
    return rows[0];
  }

  static async criar(animal) {
    const { nome, tipo, raca, idade, idade_tipo, sexo, porte, descricao, foto_url } = animal;
    const [result] = await db.query(
      `INSERT INTO animais 
      (nome, tipo, raca, idade, idade_tipo, sexo, porte, descricao, foto_url, data_entrada) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)`,
      [nome, tipo, raca, idade, idade_tipo, sexo, porte, descricao, foto_url]
    );
    return { id: result.insertId, ...animal };
  }

  static async atualizar(id, animal) {
    const { nome, tipo, raca, idade, idade_tipo, sexo, porte, descricao, foto_url, disponivel_para_adocao, status } = animal;
    await db.query(
      `UPDATE animais SET 
      nome = ?, tipo = ?, raca = ?, idade = ?, idade_tipo = ?, 
      sexo = ?, porte = ?, descricao = ?, foto_url = ?,
      disponivel_para_adocao = ?, status = ?
      WHERE id = ?`,
      [nome, tipo, raca, idade, idade_tipo, sexo, porte, descricao, foto_url, disponivel_para_adocao, status, id]
    );
  }

  static async remover(id) {
    await db.query('UPDATE animais SET status = "Falecido", disponivel_para_adocao = FALSE WHERE id = ?', [id]);
  }

  static async filtrarPorTipo(tipo) {
    const [rows] = await db.query(
      `SELECT * FROM animais 
      WHERE tipo = ? 
      AND disponivel_para_adocao = TRUE 
      AND status = 'Disponível'`, 
      [tipo]
    );
    return rows;
  }
}

module.exports = Animal;