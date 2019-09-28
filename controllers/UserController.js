const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();
const UserRepository = require('../repository/UserRepository');

router.get('/', async (req, res) => {
  const repo = await UserRepository.build();
  const usuarios = await repo.findAll();
  res.send(usuarios);
});

router.get('/detalhes', async (req, res) => {
  const { email } = req.body;
  const repo = await UserRepository.build();
  const usuarios = await repo.findOne(email);
  res.send(usuarios);
});

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = new UserModel(nome, email, senha);
    const repo = await UserRepository.build();
    const salvo = await repo.create(novoUsuario);
    res.send(salvo);
  } catch (err) {
    res.send({
      errorMessage: err.message,
      errorName: err.name,
    });
  }
});

router.put('/atualizar', async (req, res) => {
  const repo = await UserRepository.build();
  const { nome, email } = req.body;
  const user = await repo.findOne(email);
  user.found[0].nome = nome;
  const resposta = await repo.update(user.found[0]);
  res.send(resposta);
});

router.delete('/excluir', async (req, res) => {
  const repo = await UserRepository.build();
  const result = await repo.delete(req.body.email);
  res.send(result);
});

module.exports = (app) => app.use('/usuarios', router);
