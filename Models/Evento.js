const db = require('../config/db');

class Evento {
  static async listarTodos() {
    const [rows] = await db.query(`
      SELECT e.*, u.nome as responsavel_nome 
      FROM eventos e
      LEFT JOIN usuarios u ON e.responsavel_id = u.id
      ORDER BY e.data_inicio DESC
    `);
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    return rows[0];
  }

  static async criar(evento) {
    const { titulo, descricao, data_inicio, data_fim, local_evento, tipo_evento, responsavel_id, max_participantes } = evento;
    const [result] = await db.query(
      `INSERT INTO eventos 
      (titulo, descricao, data_inicio, data_fim, local_evento, tipo_evento, responsavel_id, max_participantes) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descricao, data_inicio, data_fim, local_evento, tipo_evento, responsavel_id, max_participantes]
    );
    return result.insertId;
  }

  static async atualizar(id, evento) {
    const { titulo, descricao, data_inicio, data_fim, local_evento, tipo_evento, responsavel_id, max_participantes, status } = evento;
    await db.query(
      `UPDATE eventos SET 
      titulo = ?, descricao = ?, data_inicio = ?, data_fim = ?, 
      local_evento = ?, tipo_evento = ?, responsavel_id = ?, 
      max_participantes = ?, status = ?
      WHERE id = ?`,
      [titulo, descricao, data_inicio, data_fim, local_evento, tipo_evento, responsavel_id, max_participantes, status, id]
    );
  }
}

module.exports = Evento;