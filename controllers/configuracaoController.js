const db = require('../db');

const ConfiguracaoController = {
  // Lê as configurações atuais
  async buscar(req, res) {
    try {
      const dbResult = await db.query('SELECT * FROM configuracoes LIMIT 1');
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Configurações não encontradas" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualiza as configurações (quando o cliente mexer nos "interruptores")
  async atualizar(req, res) {
    try {
      const { usa_produtos, usa_servicos } = req.body;
      
      const query = `
        UPDATE configuracoes 
        SET usa_produtos = $1, usa_servicos = $2 
        WHERE id = 1 
        RETURNING *
      `;
      
      const dbResult = await db.query(query, [usa_produtos, usa_servicos]);
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ConfiguracaoController;