export interface BusinessDto{
    user:string;
    account_type:string;
    firstname:string;
    lastname:string;
    middlename:string;
    zip:string;
    referral_code?:string;
    business_registered:boolean;
    registered_date:string;
    document:string;
    cac_reg_number?: string;
}


export interface UpdateBusinessDto{
    _id:string;
    update: object;
}