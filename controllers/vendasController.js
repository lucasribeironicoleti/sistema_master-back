const pool = require('../db');

const VendasController = {
  finalizarVenda: async (req, res) => {
    console.log("--- DEBUG: RECEBENDO REQUISIÇÃO ---");
    console.log("Payload recebido:", JSON.stringify(req.body, null, 2));

    const { cliente_nome, itens, valor_total } = req.body;

    if (!cliente_nome || !valor_total || !itens || itens.length === 0) {
      return res.status(400).json({ error: "Dados incompletos: cliente_nome, itens e valor_total são obrigatórios" });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      console.log("--- DEBUG: INSERINDO VENDA ---");
      const resVenda = await client.query(
        'INSERT INTO vendas (cliente_id, valor_total) VALUES ($1, $2) RETURNING id',
        [null, valor_total]
      );
      const vendaId = resVenda.rows[0].id;
      console.log("Venda ID gerado:", vendaId);

      // Inserção dos itens com novo formato do frontend
      for (const item of itens) {
        console.log("Processando item:", item);
        
        try {
          await client.query(
            'INSERT INTO itens_venda (venda_id, produto_id, servico_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4, $5)',
            [vendaId, null, null, item.quantidade, item.preco]
          );
        } catch (itemErr) {
          console.error("Erro ao inserir item:", itemErr.message);
          // Continua mesmo se um item falhar
        }
      }
      
      await client.query('COMMIT');
      console.log("--- DEBUG: COMMIT EFETUADO COM SUCESSO ---");
      
      res.status(201).json({ success: true, message: "Venda criada com sucesso!", vendaId });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error("--- DEBUG: ERRO CRÍTICO ---", err);
      res.status(500).json({ success: false, error: err.message });
    } finally {
      client.release();
    }
  }
};

module.exports = VendasController;