const Joi = require("@hapi/joi");

// category update validations
export const categoryValidation = (values: object) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        completeName: Joi.string().required(),
        parentId: Joi.string(),
        parentPath: Joi.string(),
        createdBy:Joi.string(),
        updatedBy:Joi.string(),
    });
    return schema.validate(values);
}
