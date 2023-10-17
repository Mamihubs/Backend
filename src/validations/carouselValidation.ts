const Joi = require("@hapi/joi");

// category update validations
export const carouselValidation = (values: object) => {
    const schema = Joi.object({
        image: Joi.string().required(),
        desc: Joi.string(),
        title: Joi.string().required(),
    });
    return schema.validate(values);
}
