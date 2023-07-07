
export interface searchDto{
    field: string,
    value: string
}

export interface UpdateOneDto{
    __id: string,
    update: object
}

export interface UpdateManyDto{
    field: string,
    value: string,
    update: object
}