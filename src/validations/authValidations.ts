const Joi = require("@hapi/joi");

// Create Account Validation
export const userRegistrationValidation = (data: object) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};