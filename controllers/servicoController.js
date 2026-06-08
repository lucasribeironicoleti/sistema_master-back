const db = require('../db');

const ServicoController = {
  async listar(req, res) {
    try {
      const dbResult = await db.query('SELECT * FROM servicos');
      return res.json(dbResult.rows);
    } catch (error) {
      console.error('Erro ao listar serviços:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nome, preco_venda, custo_hora, duracao_estimada_minutos } = req.body;
      const query = 'INSERT INTO servicos (nome, preco_venda, custo_hora, duracao_estimada_minutos) VALUES ($1, $2, $3, $4) RETURNING *';
      const dbResult = await db.query(query, [nome, preco_venda, custo_hora, duracao_estimada_minutos]);
      return res.status(201).json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco_venda, custo_hora, duracao_estimada_minutos } = req.body;
      const query = 'UPDATE servicos SET nome=$1, preco_venda=$2, custo_hora=$3, duracao_estimada_minutos=$4 WHERE id=$5 RETURNING *';
      const dbResult = await db.query(query, [nome, preco_venda, custo_hora, duracao_estimada_minutos, id]);
      
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Serviço não encontrado" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query('DELETE FROM servicos WHERE id = $1 RETURNING id', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Serviço não encontrado" });
      }
      return res.json({ mensagem: 'Serviço deletado com sucesso', id });
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const dbResult = await db.query('SELECT * FROM servicos WHERE id = $1', [id]);
      
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Serviço não encontrado" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar serviço:', error);
      return res.status(500).json({ error: error.message });
    }
  }
};


module.exports = ServicoController;