// Models
const Users = require('../../models/users').definition;

// Utils
const { hashPassword } = require('../utils/crypto');
const validator = require('./usersValidations');

exports.get = async (req, res, next) => {
  // Buscando dados
  let data = null;
  try {

    data = await Users.findAll({});

  } catch (error) {
    console.log('users get error', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Resposta
  return res.status(200).send(data);
};

exports.getOne = async (req, res, next) => {
  // Params
  const { error, value } = validator.getOne.validate(req.params);

  let data = null;  

  if (error) {
    return res.status(400).send(error);
  }

  try {
    data = await Users.findByPk(value.id);
  } catch (error) {
    console.log('user get error', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Resposta
  return res.status(201).send(data);
};

exports.post = async (req, res, next) => {
  // Params
  const { error, value } = validator.post.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const { name, email, status, password } = value;

  // Criptografando senha
  let hashedPassword = null;
  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    console.log('users post error hash', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Criação
  let data = null;
  try {
    data = await Users.create({
      name,
      email,
      status: status === true,
      password: hashedPassword,
    });
  } catch (error) {
    console.log('users post error', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Resposta
  return res.status(201).send(data);
};

exports.put = async (req, res, next) => {
  // Params
  const { error, value } = validator.put.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const { id, name, status, password } = value;

  // Validando ID
  const exists = await Users.findByPk(id);

  if (!exists) {
    return res.status(400).send('Usuário não encontrado.');
  }

  // Objeto que conterá todas as mudanças
  let modifications = {};

  // Se foi passado uma nova senha, criptografá-la
  if (password) {
    try {
      modifications.password = await hashPassword(password);
    } catch (error) {
      console.log('users put error hash', error);
      return res.status(500).send('Erro inesperado.');
    }
  }

  // Gerais
  if (name) {
    modifications.name = name;
  }

  if (status !== null || status !== undefined) {
    modifications.status = status;
  }

  // Atualização
  let data = null;
  try {
    data = await Users.update(modifications, { where: { id } });
  } catch (error) {
    console.log('users put error', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Resposta
  return res.status(200).send(data);
};

exports.delete = async (req, res, next) => {
  // Params
  const { error, value } = validator.remove.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const { id } = value;

  // Validando usuário
  const exists = await Users.findByPk(id);

  if (!exists) {
    return res.status(400).send('Usuário não encontrado.');
  }

  // Deleção
  try {
    await Users.destroy({ where: { id } });
  } catch (error) {
    console.log('users delete error', error);
    return res.status(500).send('Erro inesperado.');
  }

  // Resposta
  return res.status(200).send('Deletado com sucesso!');
};
