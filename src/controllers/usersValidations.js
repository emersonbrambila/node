const Joi = require('joi');

const getOne = Joi.object({
  id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

const post = Joi.object({
  email: Joi.string().max(255).email().required(),
  name: Joi.string().max(255),
  password: Joi.string().min(6).max(40).required(),
  status: Joi.boolean(),
});

const put = Joi.object({
  id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  name: Joi.string().max(255),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().min(6).max(40),
  status: Joi.boolean(),
});

const remove = Joi.object({
  id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

module.exports = {
  getOne,
  post,
  put,
  remove,
};
