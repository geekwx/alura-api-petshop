const { Router } = require('express')

const roteador = require('express').Router()

roteador.get('/', (requisicao, resposta) => {
    resposta.send(
        JSON.stringify([])
    )
})

module.exports = roteador