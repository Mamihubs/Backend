const Joi = require("@hapi/joi");

export const ProductValidation = (data: object) => {
  const variationSchema = Joi.object({
    variation: Joi.string().required(),
    price: Joi.number().required(),
    state: Joi.string().valid("active", "suspended", "out of stock").required(),
    barcode: Joi.string().optional(),
    volume: Joi.string().optional(),
    weight: Joi.string().optional(),
    quantity: Joi.number().default(0)
  });

  const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_desc: Joi.string().required(),
    status: Joi.boolean().default(true),
    brand: Joi.string().required(),
    created_by: Joi.string().required(),  // assuming it will be converted to ObjectId later
    categ_id: Joi.string().required(),    // assuming it will be converted to ObjectId later
    variations: Joi.array().items(variationSchema),
    images: Joi.array().items(Joi.string())  // assuming images are stored as URLs or identifiers
    // You can add more fields here based on your commented-out fields if they are required
  });

  return productSchema.validate(data);
};