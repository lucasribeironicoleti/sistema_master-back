const express = require('express');
const router = express.Router();

// Importe TODOS no topo
const ProdutoController = require('./controllers/produtoController');
const ServicoController = require('./controllers/servicoController');
const VendasController = require('./controllers/vendasController'); // Verifique o nome do arquivo aqui!
const ConfiguracaoController = require('./controllers/configuracaoController');

// --- CONFIGURAÇÕES ---
router.get('/configuracoes', ConfiguracaoController.buscar);
router.put('/configuracoes', ConfiguracaoController.atualizar);

// --- PRODUTOS ---
router.get('/produtos', ProdutoController.listar);
router.get('/produtos/:id', ProdutoController.buscarPorId);
router.post('/produtos', ProdutoController.criar);
router.put('/produtos/:id', ProdutoController.atualizar);
router.delete('/produtos/:id', ProdutoController.deletar);

// --- SERVIÇOS ---
router.get('/servicos', ServicoController.listar);
router.get('/servicos/:id', ServicoController.buscarPorId);
router.post('/servicos', ServicoController.criar);
router.put('/servicos/:id', ServicoController.atualizar);
router.delete('/servicos/:id', ServicoController.deletar);

// --- VENDAS ---
router.post('/vendas', VendasController.finalizarVenda);

module.exports = router;