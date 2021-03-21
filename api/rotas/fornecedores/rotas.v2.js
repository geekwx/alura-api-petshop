const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor
const Fornecedor = require('./Fornecedor')


roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET' )
    resposta.set('Access-Control-Allow-Headers', 'Content-Type' )
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const fornecedor = new Fornencedor(requisicao.body)
        await fornecedor.criar()
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.status(201)
        resposta.serializador(fornecedor)
    }catch(erro){
        proximo(erro)
    }
})

module.exports = roteador