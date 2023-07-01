import { Request, Response } from "express";
import User from "../models/User";
import { userRegistrationValidation } from "../validations/authValidations";
import bcrypt from "bcryptjs"


export const userRegistration = async (req: Request, res: Response) => {
    // Data Validation
    const { error } = userRegistrationValidation(req.body)

    if(error){
        // console.log(error)
        return res.status(400).json({
            error: true,
            message: error.details[0].message.toUpperCase(),
        })
    }

    // Check out user in the Database
    const userExist = await User.findOne({email: req.body.email});
    if(userExist){
        return res.status(400).json({
            error: true, 
            message: "User Already Exist"
        })
    }

    const userObj = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    }

    // create new User in the db
    const user = await User.create(userObj)
    
    // Post user creation actions go below

}