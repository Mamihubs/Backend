import { createVerificationCodeDto } from './../dto/VerificationCodeDto';
import VerificationCode from "../models/VerificationCode";
import { DeleteOneDto, UpdateManyDto, UpdateOneDto, searchDto } from '../dto/GeneralDto';

export class VerificationCodeRepository{
    // Create a VerificationCode
    async Create(code: createVerificationCodeDto){
      try {
        const codeObj = {
          user: code.user,
          code: code.code,
          isValid: code.isValid,
          maxAge: code.maxAge
        }
        
        const newCode = await VerificationCode.create(codeObj)
        return newCode
      } catch (error) {
        console.log(error)
      }
    }

     // Find one VerificationCodes
     async FindOne(search: searchDto){
        try {
          const field = search.field
          const value = search.value
          const searchObj = {[field]: value}
          const data = await VerificationCode.findOne(searchObj)
          return data
        } catch (error) {
          console.log(error)
        }
     }

     // Delete one VerificationCode
     async DeleteOne(deleteOne: DeleteOneDto){
        try{
            await VerificationCode.deleteOne({_id: deleteOne._id})
            return "Code Deleted successfully"
        }catch(err){
            console.log(err)
        }
     }


        // Delete all VerificationCodes
      async DeleteAll(){
            
        }
}