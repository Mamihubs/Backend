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

export const profileValidation = (values: object) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        passport: Joi.string().required(),
        phone_no: Joi.string().required(),
        street1: Joi.string().required(),
        street2:Joi.string(),
        date_of_birth: Joi.string().required(),
        state_of_orign: Joi.string().required(),
        identification_doc: Joi.string().required(),
        identification_name: Joi.string().required(),
        created_by:Joi.string(),
        updated_by:Joi.string(),
    });
    return schema.validate(values);
}

export const passwordResetValidation = (values:object)=>{
    const schema = Joi.object({
        email:Joi.string().required(),
        password:Joi.string().min(8).required(),
        token:Joi.string().required()
    });
    return schema.validate(values);
}