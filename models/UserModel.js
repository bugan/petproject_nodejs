const AttributeError = require('../errors/AttributeError');

class UserModel {
  constructor(nome, email, senha, dataCriacao = Date.now()) {
    this.nome = UserModel.nomeEhValido(nome);
    this.email = UserModel.emailEhValido(email);
    this.senha = UserModel.senhaEhValida(senha);
    this.dataCriacao = dataCriacao;
  }

  static emailEhValido(email) {
    const regExpValidacao = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (!regExpValidacao.test(email)) {
      throw new AttributeError('Email is not valid');
    }
    return email;
  }

  static nomeEhValido(nome) {
    if (nome.split(' ').length < 2) {
      throw new AttributeError('Nome is not valid');
    }
    return nome;
  }

  static senhaEhValida(senha) {
    const tamanhoMinimodaSenha = 8;
    const regExpMaiusculas = new RegExp(/[A-Z].+[A-Z]|[A-Z]{2,}/);
    const regExpEspeciais = new RegExp(/\W.+\W|\W{2,}/);

    if (senha.length < tamanhoMinimodaSenha) {
      throw new AttributeError('Senha is not valid');
    }
    if (!regExpMaiusculas.test(senha)) {
      throw new AttributeError('Senha precisa de letras maiusculas');
    }

    if (!regExpEspeciais.test(senha)) {
      throw new AttributeError('Senha precisa de caracteres especiais');
    }

    return senha;
  }
}

module.exports = UserModel;
