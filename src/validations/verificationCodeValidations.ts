const Joi = require("@hapi/joi");

// Create Account Validation
export const createVerificationCodeValidation = (data: object) => {
    const schema = Joi.object({
        user: Joi.string().required()
    });
    return schema.validate(data);
};

// User Login Validation
export const verifyCodeValidation = (data: object) => {
    const schema = Joi.object({
        code: Joi.string().required(),
        user: Joi.string().required()
    });
    return schema.validate(data);
};