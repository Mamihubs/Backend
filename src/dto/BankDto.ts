export interface BankDto{
    user:string;
    bank_name:string;
    account_name:string;
    account_number:string;
    account_type:string;
    bank_swiftcode:string;
    bank_branch:string;
}
export interface UpdateBankDto{
    _id:string;
   update:object;
}