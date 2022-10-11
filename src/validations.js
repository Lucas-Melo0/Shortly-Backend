import Joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

const signupValidator = validator(signupSchema);

export { signupValidator };
