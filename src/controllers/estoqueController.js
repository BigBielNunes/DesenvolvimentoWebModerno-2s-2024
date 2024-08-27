const Produto = require('../models/produto')

async function getProdutos(req,res){
    let produtos = await Produto.findAll();
    res.send(produtos);
}
async function getProdutosId(req,res){
    let id = req.params.id;
    console.log('ID: ' + id)
    let produtos = await Produto.findByPk(id);
    res.send(produtos);
}


function postCadastrarProduto(req,res){
    let produto = {
        nome: req.body.nome,
        quantidade: req.body.quantidade
    };
    Produto.create(produto).then(()=>{
        res.send(true)
    }).catch((err)=>{
        console.log(err);
        res.send(false);
    });
}

async function postAtualizarProduto(req,res){
    await Produto.update(
        {quantidade: req.body.quantidade},
        {
            where:{
                id: req.body.id
            }
        }

    ).then(()=>{
        res.send(true)
    }).catch((err)=>{
        console.log(err);
        res.send(false);
    });
}

async function postExcluirProduto(req,res){
    await Produto.destroy({
        where: {
          id: req.body.id,
        },
      }
    ).then(()=>{
        res.send(true)
    }).catch((err)=>{
        console.log(err);
        res.send(false);
    });
}

module.exports = {
    getProdutosId,
    getProdutos,
    postCadastrarProduto,
    postAtualizarProduto,
    postExcluirProduto
}