import Joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const urlSchema = Joi.object({
  url: Joi.string().uri(),
});

const signupValidator = validator(signupSchema);
const signinValidator = validator(signinSchema);
const urlValidator = validator(urlSchema);

export { signupValidator, signinValidator, urlValidator };
