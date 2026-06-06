const express = require('express');
const router = express.Router();

const ProdutoController = require('./controllers/produtoController');
const ServicoController = require('./controllers/servicoController');

// --- PRODUTOS ---
router.get('/produtos', ProdutoController.listar);
console.log("Verificando Controller:", ProdutoController.buscarPorId); // Adicione isso
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

module.exports = router;