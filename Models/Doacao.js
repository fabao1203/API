const db = require('../config/db');

class Doacao {
  static async listarTodas() {
    const [rows] = await db.query(`
      SELECT d.*, u.nome as responsavel_nome 
      FROM doacoes d
      LEFT JOIN usuarios u ON d.responsavel_id = u.id
      ORDER BY d.data_doacao DESC
    `);
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM doacoes WHERE id = ?', [id]);
    return rows[0];
  }

  static async criar(doacao) {
    const { doador_id, nome_doador, email, telefone, valor, tipo_doacao, forma_pagamento, descricao } = doacao;
    const [result] = await db.query(
      `INSERT INTO doacoes 
      (doador_id, nome_doador, email, telefone, valor, tipo_doacao, forma_pagamento, descricao) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [doador_id, nome_doador, email, telefone, valor, tipo_doacao, forma_pagamento, descricao]
    );
    return result.insertId;
  }

  static async confirmarDoacao(id, responsavel_id, comprovante_url) {
    await db.query(
      `UPDATE doacoes 
      SET status = 'Confirmada', 
          responsavel_id = ?,
          comprovante_url = ?
      WHERE id = ?`,
      [responsavel_id, comprovante_url, id]
    );
  }
}

module.exports = Doacao;