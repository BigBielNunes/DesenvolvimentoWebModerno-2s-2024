const express = require('express');
const router = express.Router();

const estoqueController = require('../controllers/estoqueController')


//associa uma rota a uma função do controller
router.get('/api/produtos', estoqueController.getProdutos);
router.get('/api/produtos/:id', estoqueController.getProdutosId);
router.post('/api/produtos/cadastrar', estoqueController.postCadastrarProduto);
router.post('/api/produtos/atualizar', estoqueController.postAtualizarProduto);
router.post('/api/produtos/excluir', estoqueController.postExcluirProduto);

module.exports = router;