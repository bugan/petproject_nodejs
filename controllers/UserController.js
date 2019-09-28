const express = require('express');
const userModel = require('../models/UserModel');
const router = express.Router();

router.get('/', async (req, res) => {
  const usuarios = await userModel.find();
  res.send(usuarios);
});

router.get('/detalhes', (req, res) => {
  res.send('{nome:Ricardo}');
});

router.post('/novo', async (req, res) => {
  const novoUsuario = await userModel.create(req.body);
  res.send(novoUsuario);
});

router.put('/atualizar', (req, res) => {
  res.send('Usuário atualizado');
});

router.delete('/excluir', (req, res) => {
  res.send('usuário deletado');
});

module.exports = (app) => app.use('/usuarios', router);
