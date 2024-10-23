import Joi from 'joi';

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


const validateUserLogin = (loginData) => {
    return loginValidationSchema.validate(loginData);
};

export default validateUserLogin;