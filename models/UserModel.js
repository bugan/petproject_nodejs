const mongoose = require('../infra/database');

const userSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  criadoEm: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
