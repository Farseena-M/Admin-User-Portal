import Joi from 'joi';

const adminLoginValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
});

const validateAdminLogin = (loginData) => {
    return adminLoginValidationSchema.validate(loginData);
};

export default validateAdminLogin;
