const db = require('../db');

const ProdutoController = {
  async listar(req, res) {
    try {
      const dbResult = await db.query('SELECT * FROM produtos');
      return res.json(dbResult.rows);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const dbResult = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
      
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nome, preco_custo, preco_venda, estoque_atual, estoque_minimo, fornecedor, validade, sku, gtin_ean, categoria, eh_composto } = req.body;
      const query = `INSERT INTO produtos (nome, preco_custo, preco_venda, estoque_atual, estoque_minimo, fornecedor, validade, sku, gtin_ean, categoria, eh_composto) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      const dbResult = await db.query(query, [nome, preco_custo, preco_venda, estoque_atual, estoque_minimo, fornecedor, validade, sku, gtin_ean, categoria, eh_composto]);
      return res.status(201).json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco_custo, preco_venda, estoque_atual, estoque_minimo, fornecedor, validade, sku, gtin_ean, categoria, eh_composto } = req.body;
      const query = `UPDATE produtos SET nome=$1, preco_custo=$2, preco_venda=$3, estoque_atual=$4, estoque_minimo=$5, fornecedor=$6, validade=$7, sku=$8, gtin_ean=$9, categoria=$10, eh_composto=$11 WHERE id=$12 RETURNING *`;
      const dbResult = await db.query(query, [nome, preco_custo, preco_venda, estoque_atual, estoque_minimo, fornecedor, validade, sku, gtin_ean, categoria, eh_composto, id]);
      
      if (dbResult.rows.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      return res.json(dbResult.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query('DELETE FROM produtos WHERE id = $1 RETURNING id', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      return res.json({ mensagem: 'Produto deletado com sucesso', id });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ProdutoController;