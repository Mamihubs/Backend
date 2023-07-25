export interface createVerificationCodeDto{
    user: string;
    code: string;
    isValid?: boolean;
    maxAge?: number;
}