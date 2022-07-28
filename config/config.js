require('dotenv').config();

module.exports = {
  development: {
    storage: process.env.DB_STORAGE_PATH,
    dialect: 'sqlite',
  },
};
