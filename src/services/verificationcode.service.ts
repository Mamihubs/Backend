import { VerificationCodeRepository } from '../repository/VerificationCodeRepository';
import bcrypt from "bcryptjs"
import { createVerificationCodeDto } from "../dto/VerificationCodeDto";
import { ObjectId, Types } from 'mongoose';

export class VerificationCodeService{
    constructor(private verificationCodeRepository: VerificationCodeRepository){
        // this.userRepository = new UserRepository()
        // this.profileRepository = new ProfileRepository()
    }
    async CreateCode(newCode: createVerificationCodeDto){
        try {
            const newCodeData = {
                user: newCode.user,
                code: newCode.code,
                isValid: newCode.isValid,
                maxAge: newCode.maxAge
            }
            const user = await this.verificationCodeRepository.Create(newCodeData);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getOneCode(field:string,text:string){
        try {
            return await this.verificationCodeRepository.FindOne({field:field,value:text});
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOneCode(id: Types.ObjectId){
        try{
            return await this.verificationCodeRepository.DeleteOne({_id: id})
        }catch(err){
            console.log(err)
        }
    }
}