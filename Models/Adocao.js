const db = require('../config/db');

class Adocao {
  static async listarTodas() {
    const [rows] = await db.query(`
      SELECT a.*, an.nome as animal_nome, ad.nome as adotante_nome 
      FROM adocoes a
      JOIN animais an ON a.animal_id = an.id
      JOIN adotantes ad ON a.adotante_id = ad.id
      ORDER BY a.data_solicitacao DESC
    `);
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(`
      SELECT a.*, an.nome as animal_nome, ad.nome as adotante_nome 
      FROM adocoes a
      JOIN animais an ON a.animal_id = an.id
      JOIN adotantes ad ON a.adotante_id = ad.id
      WHERE a.id = ?
    `, [id]);
    return rows[0];
  }

  static async criar(adocao) {
    const { animal_id, adotante_id, observacoes } = adocao;
    const [result] = await db.query(
      'INSERT INTO adocoes (animal_id, adotante_id, observacoes) VALUES (?, ?, ?)',
      [animal_id, adotante_id, observacoes]
    );
    
    
    await db.query(
      `UPDATE animais 
      SET disponivel_para_adocao = FALSE, 
          status = 'Adoção em processo' 
      WHERE id = ?`,
      [animal_id]
    );
    
    return result.insertId;
  }

  static async atualizarStatus(id, status, motivo_rejeicao = null, responsavel_id) {
    const updateData = {
      status,
      responsavel_id
    };
    
    if (status === 'Aprovada') {
      updateData.data_aprovacao = new Date();
    } else if (status === 'Rejeitada') {
      updateData.motivo_rejeicao = motivo_rejeicao;
    } else if (status === 'Concluída') {
      updateData.data_conclusao = new Date();
      
      await db.query(
        `UPDATE animais SET status = 'Adotado' 
         WHERE id = (SELECT animal_id FROM adocoes WHERE id = ?)`,
        [id]
      );
    }
    
    await db.query('UPDATE adocoes SET ? WHERE id = ?', [updateData, id]);
  }
}

module.exports = Adocao;