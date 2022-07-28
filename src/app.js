// Carregando dependências
const express = require('express');
require('dotenv').config();

// Instanciando express
const app = express();

// Conexão com o Database
require('./db/connection');

// Carregando Rotas
const usersRoutes = require('./routes/usersRoutes');

// Usando BodyParser na aplicação
app.use(express.json({ limit: process.env.MAX_SIZE + 'mb' }));
app.use(express.urlencoded({ extended: true }));

// Habilitando CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  res.header('Access-Control-Allow-Headers', process.env.ALLOW_HEADERS);
  res.header('Access-Control-Allow-Methods', process.env.ALLOW_METHODS);
  next();
});

// Usando rotas na aplicação
app.use('/users', usersRoutes);

// Exportando aplicação
module.exports = app;
