
export class RegionDto {
    name?: string;
    createdBy?: object;
    updatedBy?: object;
}

export class LocationDto{
    region?: object;
    location?: string;
    address?: string;
    phoneNo?: string;
    createdBy?: object;
    updatedBy?: object
}