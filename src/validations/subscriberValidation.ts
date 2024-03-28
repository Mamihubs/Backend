import  Joi  from "@hapi/joi"

// Create Account Validation
export const subscriberValidation = (data: object) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });
    return schema.validate(data);
};