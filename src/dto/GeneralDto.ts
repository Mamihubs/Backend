import { Types } from "mongoose"

export interface searchDto{
    field: string,
    value: string
}

export interface UpdateOneDto{
    _id: string,
    update: object
}

export interface UpdateManyDto{
    field: string,
    value: string,
    update: object
}

export interface DeleteOneDto{
    _id: string
}

export interface AllSeachDto {
    [key: string]: any;
}