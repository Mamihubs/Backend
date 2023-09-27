export interface CreateNewCategoryDto{
    name: string,
    parentId?: object,
    createdBy: object,
    
}

export interface UpdateCategoryDto{
    name?: string,
    completeName?: string,
    parentId?: object,
    updatedBy: object
}