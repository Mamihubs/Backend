export interface IdentityIndividualDto{
    user: string;
    institute_name:string;
    graduation_date:string;
    identity_card:string;
    passport:string;  
}
export interface IdentityCompanyDto{
    user: string;
    company_name:string;
    company_size:number;
    address:string;
    manager_number:string;
    identity_card:string;
    passport:string;
}
export interface UpdateIdentityIndividualDto{
    _id:string;
    update:object;  
}
export interface UpdateIdentityCompanyDto{
    _id:string;
    update:object;
}