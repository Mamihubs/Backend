const Joi = require("@hapi/joi");

// category update validations
export const locationValidation = (values: object) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(values);
}
export const locationsValidation = (values: object) => {
    const schema = Joi.object({
        region: Joi.string().required(),
        location: Joi.string().required(),
        address: Joi.string().required(),
        phoneNo: Joi.string().required(),
    });
    return schema.validate(values);
}

export const UpdatelocationsValidation = (values: object) => {
    const schema = Joi.object({
        region: Joi.string(),
        location: Joi.string(),
        address: Joi.string(),
        phoneNo: Joi.string(),
    });
    return schema.validate(values);
}
