// Sequelize
const Sequelize = require('sequelize');

// Colunas da Tabela
const fields = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    defaultValue: true,
    type: Sequelize.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
};

// Regras da tabela
const params = {
  freezeTableName: true,
};

// Exportando Model
module.exports.base = (sequelize, DataTypes) => {
  let users = sequelize.define('users', fields, params);

  return users;
};

module.exports.definition = global.sequelize.define('users', fields, params);
