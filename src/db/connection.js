// Conexão com o Database
const Sequelize = require('sequelize');

const seqConnection = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE_PATH,
});

module.exports = seqConnection;
global.sequelize = seqConnection;
