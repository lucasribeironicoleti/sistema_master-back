const db = require('../db');

const ServicoController = {
  async listar(req, res) {
    const dbResult = await db.query('SELECT * FROM servicos');
    return res.json(dbResult.rows);
  },

  async criar(req, res) {
    const { nome, preco_venda, custo_hora, duracao_estimada_minutos } = req.body;
    const query = 'INSERT INTO servicos (nome, preco_venda, custo_hora, duracao_estimada_minutos) VALUES ($1, $2, $3, $4) RETURNING id';
    const dbResult = await db.query(query, [nome, preco_venda, custo_hora, duracao_estimada_minutos]);
    return res.json({ id: dbResult.rows[0].id });
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, preco_venda, custo_hora, duracao_estimada_minutos } = req.body;
    const query = 'UPDATE servicos SET nome=$1, preco_venda=$2, custo_hora=$3, duracao_estimada_minutos=$4 WHERE id=$5';
    await db.query(query, [nome, preco_venda, custo_hora, duracao_estimada_minutos, id]);
    return res.json({ mensagem: 'Serviço atualizado com sucesso' });
  },

  async deletar(req, res) {
    const { id } = req.params;
    await db.query('DELETE FROM servicos WHERE id = $1', [id]);
    return res.json({ mensagem: 'Serviço deletado' });
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const dbResult = await db.query('SELECT * FROM servicos WHERE id = $1', [id]);
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Serviço não encontrado" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};


module.exports = ServicoController;