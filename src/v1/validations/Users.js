const Joi = require("joi");

const loginValidation = Joi.object({
  Password: Joi.string().required().min(3),
  Username: Joi.string().required().min(3),
});

exports.module = { loginValidation };
