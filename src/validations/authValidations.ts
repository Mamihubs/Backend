const Joi = require("@hapi/joi");

// Create Account Validation
export const userRegistrationValidation = (data: object) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};
export const vendorRegistrationValidation = (data: object) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        storeName: Joi.string().required(),
        storeDescription: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

// User Login Validation
export const userLoginValidation = (data: object) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

// profile update validations
export const profileValidation = (values: object) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        firstName: Joi.string().required(),
        middleName: Joi.string(),
        lastName: Joi.string().required(),
        passport: Joi.string(),
        phoneNo: Joi.string().required(),
        street1: Joi.string().required(),
        street2:Joi.string(),
        dateOfBirth: Joi.string(),
        stateOfOrign: Joi.string(),
        identificationNum:Joi.string(),
        identificationDoc: Joi.string(),
        identificationName: Joi.string(),
        createdByy:Joi.string(),
        updatedBy:Joi.string(),
        active:Joi.boolean(),
        accountStatus: Joi.string()
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