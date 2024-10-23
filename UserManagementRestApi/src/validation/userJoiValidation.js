import Joi from 'joi';

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    location: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').default('user'),
});

const validateUser = (user) => {
    return userValidationSchema.validate(user);
};

export default validateUser;
