const Joi = require("@hapi/joi");

export const ProductValidation = (data: object) => {
  const variationSchema = Joi.object({
    variation: Joi.string().required(),
    price: Joi.number().required(),
    state: Joi.string().valid("active", "suspended", "out of stock").required(),
    barcode: Joi.string().optional(),
    volume: Joi.string().optional(),
    weight: Joi.string().optional(),
    color: Joi.string().optional(),
    quantity: Joi.number().default(0),
  });

  const shippingSchema = Joi.object({
    weight: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
  });

  const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_desc: Joi.string().required(),
    status: Joi.boolean().default(true),
    brand: Joi.string().required(),
    created_by: Joi.string().required(), // assuming it will be converted to ObjectId later
    category_id: Joi.string().required(), // assuming it will be converted to ObjectId later
    variations: Joi.array().items(variationSchema),
    images: Joi.array().items(Joi.string()),
    price_discount: Joi.number().required(),
    product_price: Joi.number().required(),
    other_info: Joi.string().required(),
    product_sku: Joi.string().required(),
    product_quantity: Joi.number().required(),
    tags: Joi.array().items(Joi.string()).required(),
    shipping: Joi.array().items(shippingSchema).required(),
    // You can add more fields here based on your commented-out fields if they are required
  });

  return productSchema.validate(data);
};

export const UpdateProductValidation = (data: object) => {
  const variationSchema = Joi.object({
    variation: Joi.string().optional(),
    price: Joi.number().optional(),
    state: Joi.string().valid("active", "suspended", "out of stock").optional(),
    barcode: Joi.string().optional(),
    volume: Joi.string().optional(),
    weight: Joi.string().optional(),
    color: Joi.string().optional(),
  });
  const shippingSchema = Joi.object({
    weight: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
  });
  const productSchema = Joi.object({
    product_name: Joi.string().optional(),
    product_desc: Joi.string().optional(),
    status: Joi.boolean().optional().default(true),
    brand: Joi.string().optional(),
    created_by: Joi.string().optional(), // assuming it will be converted to ObjectId later
    // categ_id: Joi.string().optional(),  // assuming it will be converted to ObjectId later
    variations: Joi.array().items(variationSchema).optional(),
    images: Joi.array().items(Joi.string()).optional(), // assuming images are stored as URLs or identifiers
    price_discount: Joi.number().required(),
    other_info: Joi.string().required(),
    product_sku: Joi.string().required(),
    product_quantity: Joi.number().required(),
    tags: Joi.array().items(Joi.string()),
    shipping: Joi.items(shippingSchema).required(),
    product_price: Joi.number().required(),
    // You can add more fields here based on your commented-out fields if they are required
  });

  return productSchema.validate(data);
};
