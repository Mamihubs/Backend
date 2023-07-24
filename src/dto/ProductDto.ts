export interface ProductAttributeDto{
    name: string,
    created_by?: object,
    updated_by?: object
}

export interface ProductAttributeValueDto{
    name?: string,
    product_attribute_id?: object,
    created_by?: object,
    updated_by?: object
}